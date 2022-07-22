import { Request, Response, Router } from 'express'

let r = require('rethinkdb')
// import r from 'rethinkdb'
import { db } from '../config/rethinkdb'

import { hashPassword, comparePassword } from '../utils/index'
import { AuthMiddleware } from '../middleware/index'
import { Cursor } from 'rethinkdb'

interface IUser{
    name?: string,
    email: string,
    password: string
}

let router: Router = Router()

let connection: any

db.then((conn: any) => {
    connection = conn

    router.post('/login', (req: Request, res: Response) => {

        let user: IUser = {
            email: req.body.email,
            password: req.body.password
        }

        r.table('users')
        .filter({'email': user.email})
        .run(connection, (err: any, cursor: Cursor) => {
            if(err)
                console.log('err: ', err)

            cursor.toArray((err, results) => {
                // if user is found
                if(results.length > 0){
                    // compare the given password with the hashed password
                    let valid = comparePassword(user.password, results[0].password)

                    if(valid == true){
                        req.session.regenerate((err) => {
                            if(err)
                                return
                    
                            // doesnt work here
                            // req.session.uid = results[0].id

                            req.session.save((err) => {
                                if(err)
                                    return

                            })
                        })

                        req.session.uid = results[0].id

                        res.status(200).json({message: 'Successfully logged in', authenticated: true})
                    }
                    else{
                        res.status(401).json({message: 'Invalid credentials', authenticated: false})
                    }
                }
                else{
                    res.status(400).json({message: 'User not found', authenticated: false})
                }
            })
        })
        
    })
    
    router.post('/register', (req: Request, res: Response) => {
        let user: IUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        user.password = hashPassword(user.password)

        r.table('users').insert(user).run(connection)

        res.status(201).json(user)
    })
    
    router.post('/logout', AuthMiddleware, (req: Request, res: Response) => {
        req.session.uid = null

        req.session.save((err) => {
            if(err)
                return

            req.session.regenerate((err) => {
                if(err)
                    return
                res.redirect('/login')
            })
        })    
    })
})



export default router