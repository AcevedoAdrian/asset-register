import jwt from 'jsonwebtoken';
import config from '../config/config.js';
// Generate jwt token
const jwtToken = datos => jwt.sign({ id: datos.id, name: datos.name, email: datos.email }, config.JWT_SECRET, {
  expiresIn: '1h' // 24 hours

});

const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export { generateToken, jwtToken };
