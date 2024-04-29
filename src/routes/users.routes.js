import express from 'express';
import { formForgetPassword, formLogin, formRegister, registerUser } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/registerUser', registerUser);
router.get('/forget-password', formForgetPassword);
export default router;
