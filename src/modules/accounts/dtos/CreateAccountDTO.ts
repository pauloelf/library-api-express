import type { Role } from '@/generated/prisma/enums.js'

export interface CreateAccountDTO {
  name: string
  email: string
  passwordHash: string
  role: Role
}
