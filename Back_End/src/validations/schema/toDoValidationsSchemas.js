import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

export const postSchema = yup.object({
  id: yup.string().default(() => uuidv4()),
  title: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .required('Title is required'),
  is_completed: yup.boolean().default(false),

  body: yup.string().required(),
  taskPerformedOn: yup.date().required(),
  tags: yup.array().optional(),
  is_important: yup.boolean().default(false),
})

export const updateSchema = yup.object({
  id: yup.string().optional(),
  title: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .optional(),
  creation_time: yup.number().optional(),
  is_completed: yup.boolean().optional(),
  tags: yup.array().optional(),
  is_important: yup.boolean().optional(),
  updated_at: yup.number().optional(),
})
