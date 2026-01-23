import type { Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { created } from '@/http/responses.js'
import { createBookSchema } from '../schemas/createBookSchema.js'
import { CreateBookService } from '../services/CreateBookService.js'

export class CreateBookController {
  private createBookService = new CreateBookService()

  async handle(req: Request, res: Response) {
    const authorId = req.user?.id
    if (!authorId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const parsed = createBookSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new BadRequestError('Validation failed', {
        issues: parsed.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      })
    }

    const book = await this.createBookService.execute(parsed.data, authorId)
    return created(res, book)
  }
}
