import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
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
const registerUser = async (req, res) => {
  // validation rules
  await check('name').notEmpty().isLength({ min: 2 }).withMessage('El nombre no puede ir vacio ').run(req);
  await check('email').isEmail().withMessage('No es un email valido').run(req);
  await check('password').isLength({ min: 6 }).withMessage('El password debe ser al menos de 6 caracteres').run(req);
  await check('repeat_password').custom((value, { req }) => {
    return value === req.body.password;
  }).withMessage('Nos password no son iguales').run(req);

  const result = validationResult(req);
  // validation errors
  if (!result.isEmpty()) {
    return res.status(422).render('auth/register',
      {
        errors: result.array(),
        authenticated: false,
        namePage: 'Crear Cuenta',
        user: {
          name: req.body.name,
          email: req.body.email
        }
      }
    );
  }
  // Extract the email and password
  const { name, email, password } = req.body;

  // Verify if the user already exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).render('auth/register',
      {
        authenticated: false,
        namePage: 'Crear Cuenta',
        errors: [{ msg: 'El correo ya esta registrado' }],
        user: {
          name: req.body.name,
          email: req.body.email
        }
      }
    );
  }

  // Create the user
  try {
    await User.create({
      name,
      email,
      password,
      token: '123456'
    });
    return res.redirect('/auth/login');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
};

const formForgetPassword = async (req, res) => {
  res.render('auth/forget-password', {
    authenticated: false,
    namePage: 'Recuperar Contraseña'
  });
};

export { formLogin, formRegister, formForgetPassword, registerUser };
