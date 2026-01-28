import type { NextFunction, Request, Response } from 'express'

export function requireJson(req: Request, res: Response, next: NextFunction) {
  const methodsWithBody = new Set(['POST', 'PUT', 'PATCH'])
  if (!methodsWithBody.has(req.method)) return next()

  const contentType = req.headers['content-type']
  if (!contentType) return next()

  if (!req.is('application/json')) {
    return res.status(415).json({
      data: null,
      meta: {},
      error: { message: 'Content-Type must be application/json' },
    })
  }

  return next()
}
