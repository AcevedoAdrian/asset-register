import nodemailer from 'nodemailer';
import config from '../config/config.js';

const emailRegister = async (data) => {
  // Send the email
  const transporter = nodemailer.createTransport({
    host: config.EMAIL.host,
    port: config.EMAIL.port,
    secure: false,
    auth: {
      user: config.EMAIL.user,
      pass: config.EMAIL.password
    }
  });
  const { name, email, token } = data;
  const info = await transporter.sendMail({
    from: 'Direccion de Sistemas ',
    to: email,
    subject: 'Activa tu cuenta',
    text: 'Confirma tu cuenta',
    html: `
      <h1>Hola ${name}</h1>
      <p>Para activar tu cuenta por favor da click en el siguiente enlace</p>
      <a href="${config.BACKEND_URL}:${config.PORT}/auth/confirmUser/${token}">Activar cuenta</a>
    `
  });

  console.log('Message sent: %s', info.messageId);
};

export { emailRegister };
