import type { Request, Response } from 'express'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { ok } from '@/http/responses.js'
import { ListReadBooksService } from '../services/ListReadBooksService.js'

export class ListReadBooksController {
  private listReadBooksService = new ListReadBooksService()

  async handle(req: Request, res: Response) {
    const accountId = req.user?.id
    if (!accountId) throw new UnauthorizedError('Unauthorized')

    const readBooks = await this.listReadBooksService.execute(accountId)
    return ok(res, readBooks)
  }
}
