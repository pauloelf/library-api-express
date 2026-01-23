import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { authConfig } from '@/config/auth.js'
import { UnauthorizedError } from '@/errors/UnauthorizedError.js'

type JwtPayload = {
  role: 'USER' | 'AUTHOR'
  sub?: string
}

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError('Missing token')
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid token format')
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret) as JwtPayload

    const accountId = decoded.sub
    if (!accountId) {
      throw new UnauthorizedError('Invalid token')
    }

    req.user = { id: accountId, role: decoded.role }

    return next()
  } catch {
    throw new UnauthorizedError('Invalid token')
  }
}
