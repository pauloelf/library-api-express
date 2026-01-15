import type { NextFunction, Request, Response } from 'express'
import { AppError } from '@/errors/AppError.js'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      data: null,
      meta: {},
      error: {
        message: err.message,
        details: err.details ?? null,
      },
    })
  }

  return res.status(500).json({
    data: null,
    meta: {},
    error: { message: 'Internal server error' },
  })
}
