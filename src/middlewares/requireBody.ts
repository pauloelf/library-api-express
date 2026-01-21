import type { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '@/errors/BadRequestError.js'

export function requireBody(req: Request, _res: Response, next: NextFunction) {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new BadRequestError('Request body is required')
  }
  next()
}
