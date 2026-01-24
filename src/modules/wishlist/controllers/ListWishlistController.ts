import type { Request, Response } from 'express'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { ok } from '@/http/responses.js'
import { ListWishlistService } from '../services/ListWishlistService.js'

export class ListWishlistController {
  private listWishlistService = new ListWishlistService()

  async handle(req: Request, res: Response) {
    const accountId = req.user?.id
    if (!accountId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const wishlist = await this.listWishlistService.execute(accountId)
    return ok(res, wishlist)
  }
}
