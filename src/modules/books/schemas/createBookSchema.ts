import { z } from 'zod'

export const createBookSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
})

export type CreateBookInput = z.infer<typeof createBookSchema>
