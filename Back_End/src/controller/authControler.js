import user from '../models/user.js';

export default class authClass {
  signup = async (req, res, next) => {
    try {
      const newUser = new user(req.body);

      const appUser = await user.find({ email: req.body.email });

      if (appUser.length) {
        res.status(403);
        throw new Error(`user already exists`);
      }

      await newUser.save();

      res.status(201).json({
        message: 'user Added Successfully',
        success: true,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
