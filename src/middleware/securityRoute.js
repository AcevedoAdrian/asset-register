import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/config.js';

const securityRoute = async (req, res, next) => {
  console.log('Security Route Middleware');
  const { _token } = req.cookies;
  if (!_token) {
    return res.status(401).redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(_token, config.JWT_SECRET);
    const user = await User.scope('withoutPassword').findByPk(decoded.id);
    if (user) {
      req.user = user;
    } else {
      return res.clearCookie('_token').redirect('/auth/login');
    }
    return next();
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login');
  }
};

export default securityRoute;
