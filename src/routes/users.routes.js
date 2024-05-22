import express from 'express';
import {
  formForgetPassword,
  formLogin,
  formRegister,
  registerUser,
  confirmUser,
  forgetPassword,
  confirmToken,
  resetPassword,
  authenticateUser
} from '../controllers/users.controller.js';
import securityRouter from '../middleware/securityRoute.js';

const router = express.Router();

router.get('/login', formLogin);
router.post('/login', authenticateUser);
router.get('/register', formRegister);
router.post('/registerUser', registerUser);
router.get('/confirmUser/:token', confirmUser);
router.get('/forget-password', securityRouter, formForgetPassword);
router.post('/forget-password', securityRouter, forgetPassword);
router.get('/forget-password/:token', confirmToken);
router.post('/forget-password/:token', resetPassword);
export default router;
