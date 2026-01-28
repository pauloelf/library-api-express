import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '../repositories/AccountRepository.js'

export class GetMeSummaryService {
  private accountRepository = new AccountRepository()

  async execute(accountId: string) {
    const summary = await this.accountRepository.getMeSummary(accountId)
    if (!summary) {
      throw new NotFoundError('Account not found')
    }

    return {
      wishlistCount: summary.wishlistBooks,
      readCount: summary.readBooks,
    }
  }
}
