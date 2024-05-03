// Form for creating a new asset (GET)
const assetsCreate = async (req, res) => {
  res.render('assets/create', {
    namePage: 'Registrar Bien',
    authenticated: true,
    message: 'Welcome to the create asset page'
  });
};

export { assetsCreate };
