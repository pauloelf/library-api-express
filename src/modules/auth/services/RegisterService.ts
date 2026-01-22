import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authConfig } from '@/config/auth.js'
import { ConflictError } from '@/errors/ConflictError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'
import type { RegisterInput } from '../schemas/registerSchema.js'

export class RegisterService {
  private accountRepository = new AccountRepository()

  async execute({ name, email, password, role }: RegisterInput) {
    const normalizedEmail = email.toLowerCase().trim()

    const emailAlreadyExists =
      await this.accountRepository.findByEmail(normalizedEmail)
    if (emailAlreadyExists) {
      throw new ConflictError('Email already in use')
    }

    const passwordHash = await bcrypt.hash(
      password,
      authConfig.bcryptSaltRounds,
    )

    const account = await this.accountRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
    })

    const token = jwt.sign({ role: account.role }, authConfig.jwtSecret, {
      subject: account.id,
      expiresIn: authConfig.jwtExpiresIn,
    })

    const { passwordHash: _, ...safeAccount } = account

    return { account: safeAccount, token }
  }
}
