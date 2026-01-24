import type { Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { noContent } from '@/http/responses.js'
import { RemoveFromWishlistService } from '../services/RemoveFromWishlistService.js'

export class RemoveFromWishlistController {
  private removeFromWishlistService = new RemoveFromWishlistService()

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

    await this.removeFromWishlistService.execute(accountId, bookId)
    return noContent(res)
  }
}
