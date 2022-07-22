import express, { Express } from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'

import { redisClient } from './config/index'

declare module "express-session" {
    interface SessionData {
      uid: string | null
    }
  }
let RedisStore = require('connect-redis')(session)

import AuthRouter from './routes/auth'
import TodosRouter  from './routes/todos'

let app: Express = express()


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(session({
  // store: new RedisStore({client: redisClient}),
  secret: 'a12412423423423423',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // domain: 'http://localhost:5173',
    // sameSite: false,
    httpOnly: true,
    maxAge: 60000,
  }
}))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', [AuthRouter, TodosRouter])

app.listen(8181, () => console.log('todos app running!'))
