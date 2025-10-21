import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

export const postSchema = yup.object({
  id: yup.string().default(() => uuidv4()),
  title: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .required('Title is required'),
  isCompleted: yup.boolean().default(false),
  isImportant: yup.boolean().default(false),
  createdAt: yup.number().default(Date.now()),
  tags: yup.array().optional(),
  updatedAt: yup.number().default(Date.now()),
});

export const updateSchema = yup.object({
  id: yup.string().optional(),
  title: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .optional(),
  createdAt: yup.number().optional(),
  isCompleted: yup.boolean().optional(),
  tags: yup.array().optional(),
  isImportant: yup.boolean().optional(),
  updatedAt: yup.number().default(Date.now()),
});
