const formLogin = async (req, res) => {
  res.render('auth/login', {
    authenticated: false,
    namePage: 'Iniciar Sesión'
  });
};
const formRegister = async (req, res) => {
  res.render('auth/register', {
    authenticated: false,
    namePage: 'Register'
  });
};
const formForgetPassword = async (req, res) => {
  res.render('auth/forget-password', {
    authenticated: false,
    namePage: 'Recuperar Contraseña'
  });
};
export { formLogin, formRegister, formForgetPassword };
