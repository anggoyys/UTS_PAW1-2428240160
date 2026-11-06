import path from 'node:path'
import compression from 'compression'
import cors from 'cors'
import express from 'express'

import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import apiRoutes from './routes/api.routes.js'
import webRoutes from './routes/web.routes.js'
import anggotaRouter from './routes/anggota.routes.js'
import { timeLogger } from './middleware/timeLogger.js';

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

app.use('/storage/public', express.static(path.resolve(process.cwd(), 'storage/public')))

app.use('/', webRoutes)
app.use('/api/anggota', anggotaRouter)
app.use('/api', apiRoutes)

app.use(timeLogger);

app.use(notFoundHandler)
app.use(errorHandler)

export default app
