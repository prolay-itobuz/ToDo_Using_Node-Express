import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

export default class TokenGen {
  genAccess = (id) => {
    const access_token = jwt.sign({ userId: id }, access_secret, {
      //   expiresIn: '6h',
      expiresIn: '1m',
    });
    return access_token;
  };

  genRefresh = (id) => {
    const refresh_token = jwt.sign({ userId: id }, refresh_secret, {
      //   expiresIn: '180d',
      expiresIn: '180d',
    });
    return refresh_token;
  };
}
