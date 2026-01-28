import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { requireBody } from '@/middlewares/requireBody.js'
import { CreateBookController } from './controllers/CreateBookController.js'
import { ListBooksController } from './controllers/ListBooksController.js'
import { ListMyBooksController } from './controllers/ListMyBooksController.js'

const router = Router()
const createBookController = new CreateBookController()
const listBooksController = new ListBooksController()
const listMyBooksController = new ListMyBooksController()

router.get('/', listBooksController.handle.bind(listBooksController))
router.post(
  '/',
  ensureAuthenticated,
  ensureRole('AUTHOR'),
  requireBody,
  createBookController.handle.bind(createBookController),
)
router.get(
  '/mine',
  ensureAuthenticated,
  ensureRole('AUTHOR'),
  listMyBooksController.handle.bind(listMyBooksController),
)

export default router
