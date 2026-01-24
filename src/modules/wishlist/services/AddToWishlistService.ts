import { ConflictError } from '@/errors/ConflictError.js'
import { NotFoundError } from '@/errors/NotFoundError.js'
import { AccountRepository } from '@/modules/accounts/repositories/AccountRepository.js'
import { BookRepository } from '@/modules/books/repositories/BookRepository.js'

export class AddToWishlistService {
  private accountRepository = new AccountRepository()
  private bookRepository = new BookRepository()

  async execute(accountId: string, bookId: string) {
    const book = await this.bookRepository.findById(bookId)
    if (!book) {
      throw new NotFoundError('Book not found')
    }

    const wishlist = await this.accountRepository.getWishlist(accountId)

    const alreadyInWishlist = wishlist?.wishlistBooks.some(
      (b) => b.id === bookId,
    )
    if (alreadyInWishlist) {
      throw new ConflictError('Book already in wishlist')
    }

    const updated = await this.accountRepository.addBookToWishlist({
      accountId,
      bookId,
    })

    return updated.wishlistBooks
  }
}
