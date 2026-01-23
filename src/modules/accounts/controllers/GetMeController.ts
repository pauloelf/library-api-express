import type { Request, Response } from 'express'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { ok } from '@/http/responses.js'
import { GetMeService } from '../services/GetMeService.js'

export class GetMeController {
  private getMeService = new GetMeService()

  async handle(req: Request, res: Response) {
    const accountId = req.user?.id
    if (!accountId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const me = await this.getMeService.execute(accountId)
    return ok(res, me)
  }
}
