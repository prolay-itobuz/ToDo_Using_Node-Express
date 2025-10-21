import user from '../models/user.js';
import otp from '../models/otpModel.js';
import genOTP from '../utils/genOTP.js';
import otpValidation from '../utils/otpValidation.js';
import bcrypt from 'bcrypt';
import TokenGen from '../utils/genTokens.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const validateOTP = new otpValidation();
const tokenGenerator = new TokenGen();

export default class AuthController {
  signup = async (req, res, next) => {
    try {
      const newUser = new user(req.body);
      const mail = req.body.email;

      const appUser = await user.find({ email: mail });

      if (appUser[0] && appUser[0].isVerified) {
        res.status(403);

        throw new Error(`User already exists`);
      } else if (appUser[0] && !appUser[0].isVerified) {
        const uid = appUser[0]._id.toString();

        await user.findByIdAndUpdate(uid, req.body);
        genOTP(mail);

        res.status(200).json({
          message: 'OTP Sent Successfully',
          success: true,
          user: appUser,
        });
      } else {
        await newUser.save();
        genOTP(mail);

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

  verifyOTP = async (req, res, next) => {
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

      let verifiedUser = {};

      if (req.body.task == 'verify') {
        verifiedUser = await validateOTP.verifyUser(id);
      } else if (req.body.task == 'reset') {
        verifiedUser = await user.findByIdAndUpdate(id, {
          isVerified: true,
        });
      }

      res.status(200).send({
        message: 'Email Verified Successfully.',
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

  resetPass = async (req, res, next) => {
    try {
      const mail = req.body.email;

      if (!mail) {
        res.status(400);

        throw new Error('Email is required');
      } else if (mail && req.body.id) {
        const userid = req.body.id;

        console.log('test : ', req.body.password);

        if (!req.body.password) {
          res.status(400);

          throw new Error('New password is required');
        } else {
          const data = await user.findByIdAndUpdate(userid, {
            password: await bcrypt.hash(req.body.password, 10),
          });

          res.status(200).json({
            message: 'Password Updated',
            success: true,
            user: data,
          });
        }
      } else if (mail) {
        const isUser = await user.find({ email: mail });

        console.log('hello');

        if (!isUser[0]) {
          res.status(404);
          throw new Error(`Email does not exists`);
        }

        genOTP(mail);

        res.status(200).json({
          message: 'Email Sent Successfully',
          success: true,
          user: isUser[0],
        });
      }
    } catch (err) {
      next(err);
    }
  };

  signin = async (req, res, next) => {
    try {
      const loginData = req.body;
      const userinfo = await user.find({ email: loginData.email });

      if (!userinfo[0]) {
        res.status(404);
        throw new Error(`User does not exists`);
      }

      if (userinfo[0].isVerified) {
        const hashedPass = userinfo[0].password;
        const passMatch = await bcrypt.compare(loginData.password, hashedPass);

        if (passMatch) {
          const access_token = tokenGenerator.genAccess(userinfo[0]._id);
          const refresh_token = tokenGenerator.genRefresh(userinfo[0]._id);

          res.status(200).json({
            message: 'Login Successful.',
            success: true,
            access_token: access_token,
            refresh_token: refresh_token,
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
      const refresh_secret = process.env.REFRESH_SECRET;

      const decoded = jwt.verify(refresh_token, refresh_secret);

      if (decoded) {
        const access = tokenGenerator.genAccess(decoded.userId);
        const refresh = tokenGenerator.genRefresh(decoded.userId);

        res.status(200).json({
          message: 'Token Regenerated successfully',
          success: true,
          access_token: access,
          refresh_token: refresh,
        });
      }
    } catch (err) {
      res.status(401);
      next(err);
    }
  };
}
