import * as yup from 'yup';

export const verifyEmail = yup.object({
  email: yup.string().trim().required('Email is required'),
});

export const updatePassword = yup.object({
  email: yup.string().trim().required('email is required'),
  otp: yup.number().required('OTP is required'),
  password: yup.string().trim().required('Password is required'),
});
