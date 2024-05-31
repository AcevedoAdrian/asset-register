import User from '../models/User.js';
import config from '../config/config.js';
import { check, validationResult } from 'express-validator';
import { jwtToken, generateToken } from '../helpers/tokens.js';
import { emailRegister, emailForgetPassword } from '../helpers/email.js';
import { hashPassword } from '../utils/utils.js';

const formLogin = async (req, res) => {
  res.render('auth/login', {
    authenticated: false,
    namePage: 'Iniciar Sesión'
  });
};

const authenticateUser = async (req, res) => {
  // Validate the user
  await check('email').isEmail().withMessage('Email no puede ir vacio').run(req);
  await check('password').notEmpty().withMessage('El password no puede ir vacio').run(req);
  const result = validationResult(req);
  // validation errors
  if (!result.isEmpty()) {
    return res.status(422).render('auth/login',
      {
        errors: result.array(),
        authenticated: false,
        namePage: 'Iniciar Sesión',
        user: {
          email: req.body.email
        }
      }
    );
  }

  // Extract the email and password
  const { email, password } = req.body;
  // Find the user
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).render('auth/login',
      {
        authenticated: false,
        namePage: 'Iniciar Sesión',
        errors: [{ msg: 'El usuario o contrasena incorrecta' }],
        user: {
          email: req.body.email
        }
      }
    );
  }
  // Verify the user is confirmed
  if (!user.confirmed) {
    return res.status(400).render('auth/login',
      {
        authenticated: false,
        namePage: 'Iniciar Sesión',
        errors: [{ msg: 'El usuario no esta confirmado' }],
        user: {
          email: req.body.email
        }
      }
    );
  }

  // Verify the password
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(400).render('auth/login',
      {
        authenticated: false,
        namePage: 'Iniciar Sesión',
        errors: [{ msg: 'El usuario o contrasena incorrecta' }],
        user: {
          email: req.body.email
        }
      }
    );
  }
  // Implement jwt
  const token = jwtToken({
    id: user.id,
    name: user.name,
    email: user.email
  });
  // Save the token in the cookie
  res.cookie(config.JWT_NAME_COOKIE, token, {
    httpOnly: true,
    secure: false, // Pasar a true en produccion para use https
    sameSite: false, // Pasar a true en produccion para proteger contra CSRF
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }).redirect('/assets/list');
};

const formRegister = async (req, res) => {
  res.render('auth/register', {
    authenticated: false,
    namePage: 'Crear Cuenta'

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
    const user = await User.create({
      name,
      email,
      password,
      token: generateToken()
    });
    // Send the email the confirmation
    emailRegister({ name: user.name, email: user.email, token: user.token });

    // Show the success message
    return res.render('templates/message', {
      authenticated: false,
      namePage: 'Crear Cuenta',
      message: 'Hemos enviado un correo para que actives tu cuenta'
    });

    // return res.redirect('/auth/login');
  } catch (error) {
    console.log(error);
    return res.status(500).render('auth/register',
      {
        authenticated: false,
        namePage: 'Crear Cuenta',
        errors: [{ msg: error.message }],
        user: {
          name: req.body.name,
          email: req.body.email
        }
      }
    );
  }
};

const confirmUser = async (req, res) => {
  const { token } = req.params; // Token
  // Find the user with the token
  const user = await User.findOne({ where: { token } });
  if (!user) {
    return res.status(400).render('auth/confirm-user', {
      authenticated: false,
      namePage: 'Validar Usuario',
      error: true,
      message: 'Hubo un error al validar el usuario'
    });
  }
  // confirm the user
  user.token = null;
  user.confirmed = 1;
  user.active = 1;
  await user.save();
  return res.render('auth/confirm-user', {
    authenticated: false,
    namePage: 'Validar Usuario',
    message: 'La cuenta se confirmo correctamente.'
  });
};

const formForgetPassword = async (req, res) => {
  res.render('auth/forget-password', {
    authenticated: false,
    namePage: 'Recuperar Contraseña'
  });
};

const forgetPassword = async (req, res) => {
  // validation rules
  await check('email').isEmail().withMessage('No es un email valido').run(req);
  const result = validationResult(req);
  // validation errors
  if (!result.isEmpty()) {
    return res.status(422).render('auth/forget-password',
      {
        errors: result.array(),
        authenticated: false,
        namePage: 'Recuperar Contraseña'

      }
    );
  }
  // Extract the email
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).render('auth/forget-password',
      {
        authenticated: false,
        namePage: 'Recuperar Contraseña',
        errors: [{ msg: 'El correo no esta registrado' }]
      }
    );
  }
  console.log(user);
  // Send the email the confirmation
  user.token = generateToken();
  await user.save();
  await emailForgetPassword({ name: user.name, email: user.email, token: user.token });

  // Show the success message
  return res.render('templates/message', {
    authenticated: false,
    namePage: 'Restablecer Contraseña',
    message: 'Hemos enviado un correo para que recuperes tu contraseña'
  });
};

// TODO: // Fix the redirect to view the form
const confirmToken = async (req, res) => {
  const { token } = req.params; // Token
  // Find the user with the token
  const user = await User.findOne({ where: { token } });
  if (!user) {
    return res.status(400).render('auth/confirm-token', {
      authenticated: false,
      namePage: 'Validar Token',
      error: true,
      message: 'Hubo un error al validar el token'
    });
  }
  // confirm the user
  return res.render('auth/reset-password', {
    authenticated: false,
    namePage: 'Restablecer Contraseña',
    token
  });
};

const resetPassword = async (req, res) => {
  // validation password
  await check('password').isLength({ min: 6 }).withMessage('La constrasena debe ser al menos de 6 caracteres').run(req);
  const result = validationResult(req);
  // validation errors
  if (!result.isEmpty()) {
    return res.status(422).render('auth/reset-password',
      {
        errors: result.array(),
        authenticated: false,
        namePage: 'Restablecer Contraseña'
      }
    );
  }

  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ where: { token } });
  if (!user) {
    return res.status(400).render('auth/reset-password',
      {
        authenticated: false,
        namePage: 'Restablecer Contraseña',
        error: true,
        errors: [{ msg: 'El token no es valido' }]
      }
    );
  }

  user.password = await hashPassword(password);
  console.log(user.password);
  user.token = null;
  await user.save();
  return res.render('auth/confirm-user', {
    authenticated: false,
    namePage: 'Restablecer Contraseña',
    message: 'La contraseña se restablecio correctamente.'
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie(config.JWT_NAME_COOKIE).redirect('/auth/login');
};

export {
  formLogin,
  authenticateUser,
  formRegister,
  formForgetPassword,
  registerUser,
  confirmUser,
  forgetPassword,
  confirmToken,
  resetPassword,
  logoutUser
};
