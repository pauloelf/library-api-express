import express from 'express'
import { errorHandler } from '@/middlewares/errorHandler.js'
import { jsonSyntaxErrorHandler } from '@/middlewares/jsonSyntaxErrorHandler.js'
import { requireJson } from '@/middlewares/requireJson.js'
import routes from '@/routes.js'

const app = express()

app.use(requireJson)
app.use(express.json())

app.use(routes)

app.use(jsonSyntaxErrorHandler)
app.use(errorHandler)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
