import { Router } from 'express'
import { ok } from '@/http/responses.js'
import accountsRoutes from '@/modules/accounts/routes.js'
import authRoutes from '@/modules/auth/routes.js'
import booksRoutes from '@/modules/books/routes.js'
import readsRoutes from '@/modules/reads/routes.js'
import wishlistRoutes from '@/modules/wishlist/routes.js'

const routes = Router()

routes.get('/health', (_req, res) => {
  return ok(res, { status: 'ok' })
})

routes.use('/auth', authRoutes)
routes.use('/accounts', accountsRoutes)
routes.use('/books', booksRoutes)
routes.use('/wishlist', wishlistRoutes)
routes.use('/reads', readsRoutes)

export default routes
