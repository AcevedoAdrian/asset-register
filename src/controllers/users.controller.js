const formLogin = async (req, res) => {
  res.render('auth/login',{
    authenticated: false,
  });
};
const formRegister = async (req, res) => {
  res.render('auth/register',{
   
  });
};
export { formLogin, formRegister };