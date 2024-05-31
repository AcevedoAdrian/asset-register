import config from '../config/config.js';
const redirectIfAuthenticated = (req, res, next) => {
  if (req.cookies[config.JWT_NAME_COOKIE]) {
    return res.redirect('/assets/list');
  }
  return next();
};

export default redirectIfAuthenticated;
