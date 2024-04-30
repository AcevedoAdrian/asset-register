import express from 'express';
import { formForgetPassword, formLogin, formRegister, registerUser, confirmUser, forgetPassword } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/registerUser', registerUser);
router.get('/confirmUser/:token', confirmUser);
router.get('/forget-password', formForgetPassword);
router.post('/forget-password', forgetPassword);
export default router;
