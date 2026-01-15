import type { Response } from 'express'

export function ok<T>(res: Response, data: T, meta: object = {}) {
  return res.status(200).json({ data, meta, error: null })
}

export function created<T>(res: Response, data: T, meta: object = {}) {
  return res.status(201).json({ data, meta, error: null })
}

export function noContent(res: Response) {
  return res.status(204).send()
}
