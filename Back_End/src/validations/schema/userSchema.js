import * as yup from 'yup';

export const userSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Username is required'),
  email: yup.string().required('Email is required'),
  isVerified: yup.boolean().default(false),
  createdAt: yup.number().default(Date.now()),
  password: yup.string().required('Password is required'),
  role: yup.string().default('user'),
});
