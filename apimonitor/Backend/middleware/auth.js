
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import authUtil from '../server/config.js'

export default async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.cookies.authToken;
    console.log(token)



    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }


    const decoded = authUtil.verifyToken(token);
    req.userId= decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};