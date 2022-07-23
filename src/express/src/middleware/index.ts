import { Request, Response, NextFunction } from 'express'

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){

    if(!req.session.uid)
        return res.json({message: "You're not logged in", authenticated: false})

    next()
}