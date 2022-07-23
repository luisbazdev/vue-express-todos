import express, { Express } from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'

// Connect to redis
import { createClient } from 'redis'
let redisClient = createClient({legacyMode: true})
redisClient.connect().catch(console.error)

let RedisStore = require('connect-redis')(session)

declare module "express-session" {
    interface SessionData {
      uid: string | null
    }
  }

import AuthRouter from './routes/auth'
import TodosRouter  from './routes/todos'

let app: Express = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: 'secret',
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
