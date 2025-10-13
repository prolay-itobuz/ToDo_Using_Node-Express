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

// router.post('/login');

// router.post('/reset');

// router.post('/otp');

export default router;
