import { Router } from 'express'
import { authRateLimiter } from '@/middlewares/rateLimiters.js'
import { requireBody } from '@/middlewares/requireBody.js'
import { LoginController } from './controllers/LoginController.js'
import { RegisterController } from './controllers/RegisterController.js'

const router = Router()
const registerController = new RegisterController()
const loginController = new LoginController()

router.use(authRateLimiter)

router.post(
  '/register',
  requireBody,
  registerController.handle.bind(registerController),
)

router.post('/login', requireBody, loginController.handle.bind(loginController))

export default router
