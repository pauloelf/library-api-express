import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { ListReadBooksController } from './controllers/ListReadBooksController.js'
import { MarkAsReadController } from './controllers/MarkAsReadController.js'
import { UnmarkReadController } from './controllers/UnmarkReadController.js'

const router = Router()
const markController = new MarkAsReadController()
const unmarkController = new UnmarkReadController()
const listController = new ListReadBooksController()

router.use(ensureAuthenticated, ensureRole('USER'))

router.post('/:bookId', markController.handle.bind(markController))
router.delete('/:bookId', unmarkController.handle.bind(unmarkController))
router.get('/', listController.handle.bind(listController))

export default router
