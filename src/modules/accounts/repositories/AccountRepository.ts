import { prisma } from '@/database/prisma.js'
import type { CreateAccountDTO } from '@/modules/accounts/dtos/CreateAccountDTO.js'

export class AccountRepository {
  async findByEmail(email: string) {
    return prisma.account.findUnique({ where: { email } })
  }

  async create(data: CreateAccountDTO) {
    return prisma.account.create({ data })
  }

  async findById(accountId: string) {
    return prisma.account.findUnique({ where: { id: accountId } })
  }
}
