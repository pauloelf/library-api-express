import type { Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { created } from '@/http/responses.js'
import { AddToWishlistService } from '../services/AddToWishlistService.js'

export class AddToWishlistController {
  private addToWishlistService = new AddToWishlistService()

  async handle(req: Request<{ bookId: string }>, res: Response) {
    const accountId = req.user?.id
    if (!accountId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const { bookId } = req.params
    if (!bookId) {
      throw new BadRequestError('Book id is required', {
        required: 'bookId',
        received: bookId ?? null,
      })
    }

    const wishlistBooks = await this.addToWishlistService.execute(
      accountId,
      bookId,
    )
    return created(res, wishlistBooks)
  }
}
