import type { NextFunction, Request, Response } from 'express'

export function jsonSyntaxErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      data: null,
      meta: {},
      error: { message: 'Invalid JSON format' },
    })
  }

  return next(err)
}
