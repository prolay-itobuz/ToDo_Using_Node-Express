import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default class SendMail {
  mailSender = async (email, title, body) => {
    try {
      console.log('sending email...');

      const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: 'Admin - Task Manager',
        to: email,
        subject: title,
        html: body,
      });

      return info;
    } catch (error) {
      console.log(error.message);
    }
  };

  sendVerificationEmail = async (email, otp, next) => {
    try {
      console.log('Email middlewere called');
      const mailResponse = await this.mailSender(
        email,
        'Verification Email',
        `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
      );

      console.log('Email sent successfully: ', mailResponse);
    } catch (error) {
      next(error);
    }
  };
}
