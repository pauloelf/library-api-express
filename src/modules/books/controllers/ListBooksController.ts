import type { Request, Response } from 'express'
import { ok } from '@/http/responses.js'
import { ListBooksService } from '../services/ListBooksService.js'

export class ListBooksController {
  private listBooksService = new ListBooksService()

  async handle(
    req: Request<unknown, unknown, unknown, { page: string; limit: string }>,
    res: Response,
  ) {
    const page = req.query.page ? Number(req.query.page) : undefined
    const limit = req.query.limit ? Number(req.query.limit) : undefined

    const result = await this.listBooksService.execute({ page, limit })
    return ok(res, result.books, result.meta)
  }
}
