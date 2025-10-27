import user from '../models/userModel.js';
import otp from '../models/otpModel.js';
import genOtp from '../utils/genOtp.js';
import OtpValidation from '../utils/otpValidation.js';
import bcrypt from 'bcrypt';
import TokenGen from '../utils/tokenGen.js';
import jwt from 'jsonwebtoken';
import configuration from '../config/config.js';

const validateOtp = new OtpValidation();
const tokenGenerator = new TokenGen();

export default class AuthController {
  signup = async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const newUser = new user(req.body);
      const email = req.body.email;
      const appUser = await user.findOne({ email });

      if (appUser && appUser.isVerified) {
        res.status(403);

        throw new Error(`User already exists`);
      } else if (appUser && !appUser.isVerified) {
        const uid = appUser._id.toString();

        await user.findByIdAndUpdate(uid, req.body);
        genOtp(email);

        res.status(200).json({
          message: 'OTP Sent Successfully',
          success: true,
          user: appUser,
        });
      } else {
        await newUser.save();
        genOtp(email);

        res.status(201).json({
          message: 'OTP Sent Successfully',
          success: true,
          user: newUser,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newUser = await user.findById(id);

      if (!newUser) {
        res.status(404);
        throw next(`User not found`);
      }

      const mail = newUser.email;
      const key = await otp.find({ email: mail }).sort({
        createdAt: -1,
      });

      if (req.body.data.length !== 4) {
        res.status(500);

        throw new Error(`OTP should be 4 digits.`);
      } else if (req.body.data !== key[0].otp) {
        res.status(401);

        throw new Error(`Invalid OTP`);
      } else if (Date.now() - key[0].createdAt > 60 * 5000) {
        res.status(401);

        throw new Error(`OTP Expired`);
      }

      const verifiedUser = await validateOtp.verifyUser(id);

      res.status(200).send({
        message: 'Email Verified Successfully.',
        success: true,
        data: verifiedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  resendOtp = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newUser = await user.findById(id);

      if (!newUser) {
        res.status(404);
        throw new Error(`User not found`);
      }

      const email = newUser.email;
      const lastOtp = await otp.findOne({ email }).sort({
        createdAt: -1,
      });

      if (Date.now() - lastOtp.createdAt < 1000 * 60) {
        res.status(425);
        throw new Error('Please wait 1 min to resend');
      }

      genOtp(email);

      res.status(200).json({
        message: 'OTP sent Successfully',
        success: true,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };

  resetPass = async (req, res, next) => {
    try {
      const email = req.body.email;
      const newUser = await user.findOne({ email });

      if (!newUser) {
        res.status(404);
        throw new Error('Email Does not Exists.');
      }

      if (email && req.body.otp && req.body.password) {
        if (req.body.otp.length !== 4) {
          res.status(400);

          throw new Error('OTP should be 4 digits');
        }

        const otpDetails = await otp.findOne({ email }).sort({ createdAt: -1 });

        if (otpDetails.otp !== req.body.otp) {
          res.status(400);

          throw new Error('Invalid OTP');
        }

        if (Date.now() - otpDetails.createdAt > 1000 * 60 * 5) {
          res.status(400);

          throw new Error('OTP Expired');
        }

        const updatedUser = await user.findOneAndUpdate(newUser._id, {
          password: await bcrypt.hash(req.body.password, 10),
          isVerified: true,
        });

        res.status(200).json({
          message: 'Password updated successfully',
          success: true,
          user: updatedUser,
        });
      } else if (email) {
        genOtp(email);

        res.status(200).json({
          message: 'OTP sent Successfully',
          success: true,
          user: newUser,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  signin = async (req, res, next) => {
    try {
      const loginData = req.body;
      const email = loginData.email;
      const userinfo = await user.findOne({ email });

      if (!userinfo) {
        res.status(404);
        throw new Error(`User does not exists`);
      }

      if (userinfo.isVerified) {
        const hashedPass = userinfo.password;
        const passMatch = await bcrypt.compare(loginData.password, hashedPass);

        if (passMatch) {
          const tokens = tokenGenerator.genToken(userinfo._id);

          res.status(200).json({
            message: 'Login Successful.',
            success: true,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
          });
        } else {
          res.status(401);

          throw new Error(`Invalid Password.`);
        }
      } else {
        res.status(401);

        throw new Error(`User not verified, Complete Signup`);
      }
    } catch (err) {
      next(err);
    }
  };

  resetToken = async (req, res, next) => {
    try {
      const refresh_token = req.headers.authorization.split(' ')[1];
      const refresh_secret = configuration.REFRESH_SECRET;

      const decoded = jwt.verify(refresh_token, refresh_secret);

      if (decoded) {
        const tokens = tokenGenerator.genToken(decoded.userId);

        res.status(200).json({
          message: 'Token Regenerated successfully',
          success: true,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        });
      }
    } catch (err) {
      res.status(401);
      next(err);
    }
  };
}
