import express from 'express';
import AuthController from '../controller/AuthController.js';
import UserValidation from '../validations/middlewares/UserValidation.js';
import ResetFormValidation from '../validations/middlewares/ResetFormValidation.js';

const authController = new AuthController();
const userValidationRequest = new UserValidation();
const resetValidationRequest = new ResetFormValidation();

const router = express.Router();

router.post(
  '/signup',
  userValidationRequest.userCreateRequest,
  authController.signup
);

router.post('/login', authController.signin);

router.post(
  '/reset',
  resetValidationRequest.validateEmail,
  authController.resetPass
);

router.post('/resend/:id', authController.resendOtp);

router.post('/otp/:id', authController.verifyOtp);

router.post('/token', authController.resetToken);

export default router;
