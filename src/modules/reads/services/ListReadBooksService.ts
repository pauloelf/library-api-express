import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'

export class ListReadBooksService {
  private accountRepository = new AccountRepository()

  async execute(accountId: string) {
    const result = await this.accountRepository.getReadBooks(accountId)
    if (!result) {
      throw new NotFoundError('Account not found')
    }

    return result.readBooks
  }
}
