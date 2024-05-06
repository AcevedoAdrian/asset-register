const homeController = (req, res) => {
  res.render('home/index', {
    namePage: 'Home',
    authenticated: true,
    message: 'Welcome to the home page'
  });
};

export {
  homeController
};
