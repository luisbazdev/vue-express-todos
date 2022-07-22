import { Request, Response, Router } from 'express'

import { AuthMiddleware } from '../middleware/index'

// import r from 'rethinkdb'
let r = require('rethinkdb')
import { db } from '../config/rethinkdb'
import { Cursor } from 'rethinkdb'

interface Todo{
    uid: string,
    task: string,
    description?: string,
    finished: boolean
}

let router: Router = Router()

router.use(AuthMiddleware)

let connection: any

db.then((conn: any) => {
    connection = conn

    router.get('/todos', AuthMiddleware, (req: Request, res: Response) => {
        let uid = req.session.uid

        r.table('todos').filter({
            uid: uid
        }).run(connection, (err: any, cursor: Cursor) => {
            if(err)
                console.log('err: ', err)

            cursor.toArray((err, results) => {
                res.status(200).json(results)
            })
        })
    })
    
    router.post('/todos', AuthMiddleware, (req: Request, res: Response) => {
        let uid = req.session.uid

        r.table('todos').insert({
            uid,
            task: req.body.task, 
            description: req.body.description, 
            finished: false
        }).run(connection)

        res.status(201).json({
            uid,
            task: req.body.task, 
            description: req.body.description,
            finished: false
        })
    })

    // router.patch('/todos', AuthMiddleware, (req: Request, res: Response) => {})
    // router.delete('/todos', AuthMiddleware, (req: Request, res: Response) => {})
})

export default router