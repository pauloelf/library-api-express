import { Router } from 'express'
import { ok } from '@/http/responses.js'

const routes = Router()

routes.get('/health', (_req, res) => {
  return ok(res, { status: 'ok' })
})

export default routes
