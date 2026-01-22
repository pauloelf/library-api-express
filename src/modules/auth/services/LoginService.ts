import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authConfig } from '@/config/auth.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'
import type { LoginInput } from '../schemas/loginSchema.js'

export class LoginService {
  private accountRepository = new AccountRepository()

  async execute({ email, password }: LoginInput) {
    const normalizedEmail = email.toLowerCase().trim()

    const account = await this.accountRepository.findByEmail(normalizedEmail)
    if (!account) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const passwordMatches = await bcrypt.compare(password, account.passwordHash)
    if (!passwordMatches) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = jwt.sign({ role: account.role }, authConfig.jwtSecret, {
      subject: account.id,
      expiresIn: authConfig.jwtExpiresIn,
    })

    return { token }
  }
}
