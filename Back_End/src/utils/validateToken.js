import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function getUserId(req) {
  const access_secret = process.env.ACCESS_SECRET;
  const access_token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(access_token, access_secret);
  const userId = decoded.userId;

  return userId;
}
