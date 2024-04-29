import express from 'express';
import { formForgetPassword, formLogin, formRegister } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.get('/forget-password', formForgetPassword);
export default router;
