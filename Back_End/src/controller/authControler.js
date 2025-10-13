import user from '../models/user.js';
import otp from '../models/otpModel.js';
import otpGenerator from 'otp-generator';
import SendMail from '../utils/mailsender.js';

const mailer = new SendMail();

export default class authControllerClass {
  signup = async (req, res, next) => {
    try {
      const newUser = new user(req.body);
      const mail = req.body.email;

      const appUser = await user.find({ email: mail });

      if (appUser.length) {
        res.status(403);
        throw new Error(`user already exists`);
      }

      await newUser.save();

      const otpkey = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const newOtp = new otp({
        email: mail,
        otp: otpkey,
      });

      newOtp.save();
      mailer.sendVerificationEmail(mail, otpkey);

      res.status(201).json({
        message: 'User Added Successfully',
        success: true,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
