import user from '../models/user.js';
import otp from '../models/otpModel.js';
import genOTP from '../utils/genOTP.js';
import otpValidation from '../utils/otpValidation.js';
import bcrypt from 'bcrypt';

const validateOTP = new otpValidation();

export default class authControllerClass {
  signup = async (req, res, next) => {
    try {
      const newUser = new user(req.body);
      const mail = req.body.email;

      const appUser = await user.find({ email: mail });

      if (appUser[0] && appUser[0].isVerified) {
        res.status(403);

        throw new Error(`user already exists`);
      } else if (appUser[0] && !appUser[0].isVerified) {
        genOTP(mail);

        res.status(200).json({
          message: 'OTP Sent Successfully',
          success: true,
          user: newUser,
        });
      } else {
        await newUser.save();
        genOTP(mail);

        res.status(201).json({
          message: 'User Added Successfully',
          success: true,
          user: newUser,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  verifyOTP = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newUser = await user.findById(id);

      if (!newUser) {
        res.status(404);
        throw new Error(`User not found`);
      }

      const mail = newUser.email;
      const key = await otp.find({ email: mail }).sort({
        createdAt: -1,
      });

      if (req.body.data !== key[0].otp) {
        res.status(401);

        throw new Error(`Invalid OTP`);
      } else if (Date.now() - key[0].createdAt > 60 * 5000) {
        res.status(401);

        throw new Error(`OTP Expired`);
      }

      let verifiedUser = {};

      if (req.body.task == 'verify') {
        verifiedUser = await validateOTP.verifyUser(id);
      }

      res.status(200).send({
        message: 'OTP Verified',
        success: true,
        data: verifiedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  resendOTP = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newUser = await user.findById(id);

      if (!newUser) {
        res.status(404);
        throw new Error(`User not found`);
      }

      const mail = newUser.email;
      genOTP(mail);

      res.status(200).json({
        message: 'Resend OTP sent Successfully',
        success: true,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };

  // resetPass = async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const newUser = await user.findById(id);

  //     if (!newUser) {
  //       res.status(404);
  //       throw new Error(`User not found`);
  //     }

  //     // const newPass = await bcrypt.hash(req.body.password, 10);

  //     res.status(200).json({
  //       message: 'Password Reset Successfully',
  //       success: true,
  //       user: newUser,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}
