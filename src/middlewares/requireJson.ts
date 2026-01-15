import type { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'

export function requireJson(req: Request, _res: Response, next: NextFunction) {
  const methodsWithBody = new Set(['POST', 'PUT', 'PATCH'])

  if (!methodsWithBody.has(req.method)) {
    return next()
  }

  if (!req.is('application/json')) {
    throw new BadRequestError('Content-Type must be application/json')
  }

  return next()
}
