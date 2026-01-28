import type { Request, Response } from 'express'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { ok } from '@/http/responses.js'
import { GetMeSummaryService } from '../services/GetMeSummaryService.js'

export class GetMeSummaryController {
  private getMeSummaryService = new GetMeSummaryService()

  async handle(req: Request, res: Response) {
    const accountId = req.user?.id
    if (!accountId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const summary = await this.getMeSummaryService.execute(accountId)
    return ok(res, summary)
  }
}
