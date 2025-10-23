import jwt from 'jsonwebtoken';
import configuration from '../config/config.js';

const access_secret = configuration.ACCESS_SECRET;
const refresh_secret = configuration.REFRESH_SECRET;

export default class TokenGen {
  genAccess = (id) => {
    const access_token = jwt.sign({ userId: id }, access_secret, {
      expiresIn: configuration.ACCESS_EXPIRE,
    });

    return access_token;
  };

  genRefresh = (id) => {
    const refresh_token = jwt.sign({ userId: id }, refresh_secret, {
      expiresIn: configuration.REFRESH_EXPIRE,
    });

    return refresh_token;
  };
}
