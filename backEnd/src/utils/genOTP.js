import otpGenerator from 'otp-generator';
import SendMail from './mailSender.js';
import otp from '../models/otpModel.js';

const mailer = new SendMail();

export default function genOtp(mail) {
  try {
    const otpKey = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const newOtp = new otp({
      email: mail,
      otp: otpKey,
    });

    newOtp.save();
    mailer.sendVerificationEmail(mail, otpKey);
  } catch (err) {
    return err;
  }
}
