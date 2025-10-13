import otpGenerator from 'otp-generator';
import SendMail from '../utils/mailsender.js';
import otp from '../models/otpModel.js';

const mailer = new SendMail();

export default function genOTP(mail) {
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
}
