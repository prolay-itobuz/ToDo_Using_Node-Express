import { userSchema } from '../schema/userSchema.js';
import { ValidationError } from 'yup';
import bcrypt from 'bcrypt';

export default class userValidation {
  userCreateRequest = async (req, res, next) => {
    try {
      if (req.headers.role === 'admin') {
        req.body.role = req.headers.role;
      } else {
        req.body.role = 'user';
      }

      await userSchema.validate(req.body, {
        abortEarly: false, // return all validation errors
        stripUnknown: true, // remove unexpected fields
      });

      req.body.password = await bcrypt.hash(req.body.password, 10);

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
