const securityRoute = (req, res, next) => {
  console.log('Security Route Middleware');
  next();
};

export default securityRoute;
