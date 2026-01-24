import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { AddToWishlistController } from './controllers/AddToWishlistController.js'
import { ListWishlistController } from './controllers/ListWishlistController.js'
import { RemoveFromWishlistController } from './controllers/RemoveFromWishlistController.js'

const router = Router()
const addController = new AddToWishlistController()
const removeController = new RemoveFromWishlistController()
const listController = new ListWishlistController()

router.use(ensureAuthenticated, ensureRole('USER'))

router.post('/:bookId', addController.handle.bind(addController))
router.delete('/:bookId', removeController.handle.bind(removeController))
router.get('/', listController.handle.bind(listController))

export default router
