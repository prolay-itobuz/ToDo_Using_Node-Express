import SendMail from './SendMail.js';
import otp from '../models/otpModel.js';

const mailer = new SendMail();

export default function genOtp(mail) {
  try {
    const randomNum = Math.random() * 9000;
    const otpKey = Math.floor(1000 + randomNum);

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
