import { ConflictError } from '@/errors/ConflictError.js'
import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'
import { BookRepository } from '@/modules/books/repositories/BookRepository.js'

export class MarkAsReadService {
  private accountRepository = new AccountRepository()
  private bookRepository = new BookRepository()

  async execute(accountId: string, bookId: string) {
    const book = await this.bookRepository.findById(bookId)
    if (!book) throw new NotFoundError('Book not found')

    const readList = await this.accountRepository.getReadBooks(accountId)
    const alreadyRead = readList?.readBooks.some((b) => b.id === bookId)

    if (alreadyRead) {
      throw new ConflictError('Book already marked as read')
    }

    const updated = await this.accountRepository.markBookAsRead({
      accountId,
      bookId,
    })
    return updated.readBooks
  }
}
