import type { Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'
import { ok } from '@/http/responses.js'
import { loginSchema } from '../schemas/loginSchema.js'
import { LoginService } from '../services/LoginService.js'

export class LoginController {
  private loginService = new LoginService()

  async handle(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body)

    if (!parsed.success) {
      throw new BadRequestError('Validation failed', {
        issues: parsed.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      })
    }

    const result = await this.loginService.execute(parsed.data)

    return ok(res, result)
  }
}
