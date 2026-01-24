import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { requireBody } from '@/middlewares/requireBody.js'
import { CreateBookController } from './controllers/CreateBookController.js'
import { ListBooksController } from './controllers/ListBooksController.js'

const router = Router()
const createBookController = new CreateBookController()
const listBooksController = new ListBooksController()

router.post(
  '/',
  ensureAuthenticated,
  ensureRole('AUTHOR'),
  requireBody,
  createBookController.handle.bind(createBookController),
)

router.get('/', listBooksController.handle.bind(listBooksController))

export default router
