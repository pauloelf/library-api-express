import { BookRepository } from '../repositories/BookRepository.js'
import type { ListBooksInput } from '../schemas/listBooksSchema.js'

export class ListBooksService {
  private bookRepository = new BookRepository()

  async execute(input?: ListBooksInput) {
    const page = Number(input?.page ?? 1)
    const limit = Number(input?.limit ?? 10)

    const normalizedPage = Number.isFinite(page) && page > 0 ? page : 1
    const normalizedLimitRaw = Number.isFinite(limit) && limit > 0 ? limit : 10
    const normalizedLimit = Math.min(normalizedLimitRaw, 50)

    const total = await this.bookRepository.countAll()
    const totalPages = Math.max(1, Math.ceil(total / normalizedLimit))

    const pagination = { page: normalizedPage, limit: normalizedLimit }
    const books = await this.bookRepository.findManyPaginated(pagination)

    return {
      books,
      meta: {
        ...pagination,
        total,
        totalPages,
      },
    }
  }
}
