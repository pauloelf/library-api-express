import { Router } from 'express'
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated.js'
import { ensureRole } from '@/middlewares/ensureRole.js'
import { GetMeController } from './controllers/GetMeController.js'
import { GetMeSummaryController } from './controllers/GetMeSummaryController.js'

const router = Router()
const getMeController = new GetMeController()
const getMeSummaryController = new GetMeSummaryController()

router.get(
  '/me',
  ensureAuthenticated,
  getMeController.handle.bind(getMeController),
)
router.get(
  '/me/summary',
  ensureAuthenticated,
  ensureRole('USER'),
  getMeSummaryController.handle.bind(getMeSummaryController),
)

export default router
