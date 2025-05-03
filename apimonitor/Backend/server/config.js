import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'sahil';

const generateToken = (userId) => {
  return jwt.sign({ id: userId },JWT_SECRET, {
    expiresIn: '30d'
  });
};

const verifyToken = (token) => {
  return jwt.verify(token,JWT_SECRET);
};

export default {generateToken,verifyToken}
