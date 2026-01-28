import type { Request, Response } from 'express'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { ok } from '@/http/responses.js'
import { ListMyBooksService } from '../services/ListMyBooksService.js'

export class ListMyBooksController {
  private listMyBooksService = new ListMyBooksService()

  async handle(req: Request, res: Response) {
    const authorId = req.user?.id
    if (!authorId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const books = await this.listMyBooksService.execute(authorId)
    return ok(res, books)
  }
}
