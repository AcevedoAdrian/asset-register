const adminController = (req, res) => {
  res.render('admin/index', {
    namePage: 'Home',
    authenticated: true,
    message: 'Welcome to the home page',
    assets: []
  });
};

export {
  adminController
};
