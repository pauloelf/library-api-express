import { Router } from 'express'
import { ok } from '@/http/responses.js'
import accountRoutes from '@/modules/accounts/routes.js'
import authRoutes from '@/modules/auth/routes.js'

const routes = Router()

routes.get('/health', (_req, res) => {
  return ok(res, { status: 'ok' })
})

routes.use('/auth', authRoutes)
routes.use('/accounts', accountRoutes)

export default routes
