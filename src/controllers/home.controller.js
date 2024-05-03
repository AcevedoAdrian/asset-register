const homeController = (req, res) => {
  res.render('home/index', {
    namePage: 'Home',
    authenticated: true,
    message: 'Welcome to the home page'
  });
};

const createAssetController = (req, res) => { 
  
};
export {
  homeController
};
