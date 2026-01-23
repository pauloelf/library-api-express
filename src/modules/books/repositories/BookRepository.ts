import { prisma } from '@/database/prisma.js'
import type { CreateBookDTO } from '../dtos/CreateBookDTO.js'
import type { FindByTitleAndAuthorDTO } from '../dtos/FindByTitleAndAuthorDTO.js'

export class BookRepository {
  async countByAuthorId(authorId: string) {
    return prisma.book.count({ where: { authorId } })
  }

  async create(data: CreateBookDTO) {
    return prisma.book.create({ data })
  }

  async findByTitleAndAuthor({ authorId, title }: FindByTitleAndAuthorDTO) {
    return prisma.book.findFirst({
      where: {
        authorId,
        title,
      },
    })
  }
}
