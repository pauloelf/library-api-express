import { BookRepository } from '../repositories/BookRepository.js'

export class ListMyBooksService {
  private bookRepository = new BookRepository()

  async execute(authorId: string) {
    return this.bookRepository.findByAuthorId(authorId)
  }
}
