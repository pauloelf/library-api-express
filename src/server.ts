import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { errorHandler } from '@/middlewares/errorHandler.js'
import { jsonSyntaxErrorHandler } from '@/middlewares/jsonSyntaxErrorHandler.js'
import { requireJson } from '@/middlewares/requireJson.js'
import routes from '@/routes.js'

const app = express()

app.use(helmet())

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3333'],
    credentials: true,
  }),
)

app.use(express.json())
app.use(requireJson)

app.use(routes)

app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
