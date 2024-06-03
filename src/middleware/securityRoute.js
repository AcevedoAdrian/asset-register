import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/config.js';

const securityRoute = async (req, res, next) => {
  const { _token } = req.signedCookies;
  if (!_token) {
    return res.status(401).redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(_token, config.JWT_SECRET);
    const user = await User.scope('withoutPassword').findByPk(decoded.id);
    if (user) {
      req.user = user;
    } else {
      return res.clearCookie(config.JWT_NAME_COOKIE).redirect('/auth/login');
    }
    return next();
  } catch (error) {
    return res.clearCookie(config.JWT_NAME_COOKIE).redirect('/auth/login');
  }
};

export default securityRoute;
