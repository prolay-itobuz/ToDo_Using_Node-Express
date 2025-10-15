import express from 'express';
import authControllerClass from '../controller/authControler.js';
import userValidation from '../validations/middlewares/userValidation.js';

const authcontroller = new authControllerClass();
const userValidationRequest = new userValidation();

const router = express.Router();

router.post(
  '/signup',
  userValidationRequest.userCreateRequest,
  authcontroller.signup
);

router.post('/login', authcontroller.signin);

router.post('/reset', authcontroller.resetPass);

router.post('/resend/:id', authcontroller.resendOTP);

router.post('/otp/:id', authcontroller.verifyOTP);

router.post('/token', authcontroller.resetToken);

export default router;
