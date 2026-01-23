import { ConflictError } from '@/errors/ConflictError.js'
import { MAX_BOOKS_PER_AUTHOR } from '@/utils/constants.js'
import { BookRepository } from '../repositories/BookRepository.js'
import type { CreateBookInput } from '../schemas/createBookSchema.js'

export class CreateBookService {
  private bookRepository = new BookRepository()

  async execute({ title }: CreateBookInput, authorId: string) {
    const normalizedTitle = title.trim()

    const booksCount = await this.bookRepository.countByAuthorId(authorId)
    if (booksCount >= MAX_BOOKS_PER_AUTHOR) {
      throw new ConflictError('Author book limit reached')
    }

    const newBookData = { title: normalizedTitle, authorId }

    const duplicated =
      await this.bookRepository.findByTitleAndAuthor(newBookData)
    if (duplicated) {
      throw new ConflictError('Book already exists for this author')
    }

    return this.bookRepository.create(newBookData)
  }
}
