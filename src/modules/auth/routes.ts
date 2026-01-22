import { Router } from 'express'
import { requireBody } from '@/middlewares/requireBody.js'
import { RegisterController } from './controllers/RegisterController.js'

const router = Router()
const registerController = new RegisterController()

router.post(
  '/register',
  requireBody,
  registerController.handle.bind(registerController),
)

export default router
