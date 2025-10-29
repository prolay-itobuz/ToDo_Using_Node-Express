import jwt from 'jsonwebtoken';
import configuration from '../config/config.js';

const access_secret = configuration.ACCESS_SECRET;
const refresh_secret = configuration.REFRESH_SECRET;

export default class TokenGen {
  genToken = (id) => {
    const access = jwt.sign({ userId: id }, access_secret, {
      expiresIn: configuration.ACCESS_EXPIRE,
    });

    const refresh = jwt.sign({ userId: id }, refresh_secret, {
      expiresIn: configuration.REFRESH_EXPIRE,
    });

    return {
      access_token: access,
      refresh_token: refresh,
    };
  };
}
