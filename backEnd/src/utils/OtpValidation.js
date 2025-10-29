import user from '../models/userModel.js';

export default class OtpValidation {
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
