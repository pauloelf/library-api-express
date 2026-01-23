import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '../repositories/AccountRepository.js'

export class GetMeService {
  private accountRepository = new AccountRepository()

  async execute(accountId: string) {
    const account = await this.accountRepository.findById(accountId)
    if (!account) {
      throw new NotFoundError('Account does not exist')
    }

    const { passwordHash: _, ...safeAccount } = account
    return safeAccount
  }
}
