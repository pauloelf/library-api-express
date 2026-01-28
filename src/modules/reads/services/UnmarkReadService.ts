import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'
import { BookRepository } from '@/modules/books/repositories/BookRepository.js'

export class UnmarkReadService {
  private accountRepository = new AccountRepository()
  private bookRepository = new BookRepository()

  async execute(accountId: string, bookId: string) {
    const book = await this.bookRepository.findById(bookId)
    if (!book) {
      throw new NotFoundError('Book not found')
    }

    const updated = await this.accountRepository.unmarkBookAsRead({
      accountId,
      bookId,
    })

    return updated.readBooks
  }
}
