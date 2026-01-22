import type { Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'
import { created } from '@/http/responses.js'
import { registerSchema } from '../schemas/registerSchema.js'
import { RegisterService } from '../services/RegisterService.js'

export class RegisterController {
  private registerService = new RegisterService()

  async handle(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body)

    if (!parsed.success) {
      throw new BadRequestError('Validation failed', {
        issues: parsed.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      })
    }

    const result = await this.registerService.execute(parsed.data)

    return created(res, result)
  }
}
