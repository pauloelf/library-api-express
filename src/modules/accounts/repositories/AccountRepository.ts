import { prisma } from '@/database/prisma.js'
import type { CreateAccountDTO } from '@/modules/accounts/dtos/CreateAccountDTO.js'
import type { AddBookToWishlistDTO } from '../dtos/AddBookToWishlistDTO.js'
import type { RemoveBookFromWishlistDTO } from '../dtos/RemoveBookFromWishlistDTO.js'

export class AccountRepository {
  async findByEmail(email: string) {
    return prisma.account.findUnique({ where: { email } })
  }

  async create(data: CreateAccountDTO) {
    return prisma.account.create({ data })
  }

  async findById(accountId: string) {
    return prisma.account.findUnique({ where: { id: accountId } })
  }

  async addBookToWishlist({ accountId, bookId }: AddBookToWishlistDTO) {
    return prisma.account.update({
      where: { id: accountId },
      data: {
        wishlistBooks: {
          connect: { id: bookId },
        },
      },
      include: {
        wishlistBooks: true,
      },
    })
  }

  async removeBookFromWishlist({
    accountId,
    bookId,
  }: RemoveBookFromWishlistDTO) {
    return prisma.account.update({
      where: { id: accountId },
      data: {
        wishlistBooks: {
          disconnect: { id: bookId },
        },
      },
      include: {
        wishlistBooks: true,
      },
    })
  }

  async getWishlist(accountId: string) {
    return prisma.account.findUnique({
      where: { id: accountId },
      select: {
        wishlistBooks: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, name: true } },
          },
        },
      },
    })
  }
}
