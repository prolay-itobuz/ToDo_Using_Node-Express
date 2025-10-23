import nodemailer from 'nodemailer';
import configuration from '../config/config.js';

export default class SendMail {
  mailSender = async (email, title, body) => {
    try {
      console.log('sending email...');

      const transporter = nodemailer.createTransport({
        service: configuration.MAIL_SERVICE,
        auth: {
          user: configuration.MAIL_USER,
          pass: configuration.MAIL_PASS,
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
      return error;
    }
  };

  sendVerificationEmail = async (email, otp, next) => {
    try {
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
