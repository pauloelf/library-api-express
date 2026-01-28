import { prisma } from '@/database/prisma.js'
import type { CreateBookDTO } from '../dtos/CreateBookDTO.js'
import type { FindByTitleAndAuthorDTO } from '../dtos/FindByTitleAndAuthorDTO.js'
import type { FindManyPaginatedDTO } from '../dtos/findManyPaginatedDTO.js'

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

  async countAll() {
    return prisma.book.count()
  }

  async findManyPaginated({ limit, page }: FindManyPaginatedDTO) {
    const skip = (page - 1) * limit

    return prisma.book.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    })
  }

  async findById(id: string) {
    return prisma.book.findUnique({ where: { id } })
  }

  async findByAuthorId(authorId: string) {
    return prisma.book.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    })
  }
}
