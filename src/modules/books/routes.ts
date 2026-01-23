import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { requireBody } from '@/middlewares/requireBody.js'
import { CreateBookController } from './controllers/CreateBookController.js'

const router = Router()
const createBookController = new CreateBookController()

router.post(
  '/',
  ensureAuthenticated,
  ensureRole('AUTHOR'),
  requireBody,
  createBookController.handle.bind(createBookController),
)

export default router
