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

    router.get('/todos', (req: Request, res: Response) => {
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
    
    router.post('/todos', (req: Request, res: Response) => {
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

    router.patch('/todos/:id', (req: Request, res: Response) => {
        let { id } = req.params

        let { task, description } = req.body

        r.table('todos').get(id).update({
            task,
            description
        }).run(connection);
    })

    router.delete('/todos:id', (req: Request, res: Response) => {
        let { id } = req.params

        r.table('todos').get(id).delete().run(connection)

        res.status(200).json({
            message: 'Todo deleted'
        })
    })

})

export default router