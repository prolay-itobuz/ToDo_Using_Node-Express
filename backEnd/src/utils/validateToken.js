import jwt from 'jsonwebtoken';
import configuration from '../config/config.js';

export default function getUserId(req) {
  const access_secret = configuration.ACCESS_SECRET;
  const access_token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(access_token, access_secret);
  const userId = decoded.userId;

  return userId;
}
