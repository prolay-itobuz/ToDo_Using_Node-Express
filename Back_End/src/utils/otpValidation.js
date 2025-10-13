import user from '../models/user.js';

export default class otpValidation {
  verifyUser = async (id) => {
    const verifiedUser = await user.findByIdAndUpdate(
      id,
      { isVerified: true },
      {
        new: true,
        runValidators: true,
      }
    );
    return verifiedUser;
  };
}
