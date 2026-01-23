import type { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '@/errors/ForbiddenError.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'

type Role = 'USER' | 'AUTHOR'

export function ensureRole(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
      throw new UnauthorizedError('Unauthorized')
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError('Insufficient permissions', {
        requiredRoles: allowedRoles,
        receivedRole: user.role,
      })
    }

    return next()
  }
}
