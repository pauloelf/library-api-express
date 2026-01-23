import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { GetMeController } from './controllers/GetMeController.js'

const router = Router()
const getMeController = new GetMeController()

router.get(
  '/me',
  ensureAuthenticated,
  getMeController.handle.bind(getMeController),
)

export default router
