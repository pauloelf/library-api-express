import { AppError } from './AppError.js'

export class NotFoundError extends AppError {
  constructor(message = 'Not found', details?: unknown) {
    super(message, 404, details)
  }
}
