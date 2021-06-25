import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import template from '../template'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import devBundle from './devBundle'
import path from 'path'


const CURRENT_WORKING_DIR = process.cwd ()

// creating app
const app = express ()

devBundle.compile (app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use ('/dist', express.static (path.join (CURRENT_WORKING_DIR, 'dist')))

app.use (cookieParser ())
app.use (compression ())
app.use (helmet ())
app.use (cors ())

app.use ('/', userRoutes)
app.use ('/', authRoutes)

app.get ('/', (req, res) => {
    res.status (200).send (template ())
})

app.use ((err, req, res, next) => {
    if (err.name == 'UnauthorizedError')
        return res.status (401).json ({
            "error" : err.name + ":" + err.message
        })
    else if (err)
    return res.status (400).json ({
        "error" : err.name + ":" + err.message
    })
})

export default app