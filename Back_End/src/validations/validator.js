import * as yup from 'yup';

export const todoSchema = yup.object({
  id: yup.string().uuid("ID must be a valid UUID").required("ID is required"),
  title: yup.string().required("Title is required"),
  creation_time: yup.number().required("Creation time is required"),
  is_completed: yup.boolean().required("ByDefault always False"),
  tags: yup.string().optional(),
  is_important: yup.boolean().required("It can be true or false"),
  updated_at: yup.number().required("Update time is required"),
});