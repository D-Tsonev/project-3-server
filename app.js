import express from 'express'
import router from './views/router.js'
import cors from 'cors'
// import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
// import connectToDb from './db/connectToDb.js'

const app = express()

app.use(cors())

app.use(express.json())
// ? Using my own logging middleware.

// app.use(logger)

app.use('/api', router)

app.use('/images', express.static('/db/data'))

app.use(errorHandler)



export default app