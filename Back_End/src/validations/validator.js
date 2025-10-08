import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid'
// import { getISTLocalizedTime } from '../utils/utils.js'

export const todoSchema = yup.object({
  id: yup.string().default(() => uuidv4()),
  title: yup.string().trim().min(3, 'Title must be at least 3 characters long').required('Title is required'),
  creation_time: yup.number().default(() => Date.now()),
  is_completed: yup.boolean().default(false),
  tags: yup.array().optional(),
  is_important: yup.boolean().default(false),
  updated_at: yup.number().default(() => Date.now()),
});

