import { verifyEmail } from '../schema/resetFormSchema.js';
import { ValidationError } from 'yup';
// import bcrypt from 'bcrypt';

export default class ResetFormValidation {
  validateEmail = async (req, res, next) => {
    try {
      await verifyEmail.validate(req.body, {
        abortEarly: false, // return all validation errors
        stripUnknown: true, // remove unexpected fields
      });

      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400);
        next(new Error(err.errors.join(', ')));
      }

      next(err);
    }
  };
}
