import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

export default class TokenGen {
  genAccess = (id) => {
    const access_token = jwt.sign({ userId: id }, access_secret, {
      expiresIn: process.env.ACCESS_EXPIRE,
    });

    return access_token;
  };

  genRefresh = (id) => {
    const refresh_token = jwt.sign({ userId: id }, refresh_secret, {
      expiresIn: process.env.REFRESH_EXPIRE,
    });

    return refresh_token;
  };
}
