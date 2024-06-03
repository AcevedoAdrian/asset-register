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
  authenticateUser,
  logoutUser
} from '../controllers/users.controller.js';
import securityRouter from '../middleware/securityRoute.js';
import redirectIfAuthenticated from '../middleware/redirectIfAuthenticated.js';

const router = express.Router();

router.get('/login', redirectIfAuthenticated, formLogin);
router.post('/login', authenticateUser);
router.get('/register', formRegister);
router.post('/registerUser', registerUser);
router.get('/confirmUser/:token', redirectIfAuthenticated, confirmUser);
router.get('/forget-password', redirectIfAuthenticated, securityRouter, formForgetPassword);
router.post('/forget-password', securityRouter, forgetPassword);
router.get('/forget-password/:token', redirectIfAuthenticated, confirmToken);
router.post('/forget-password/:token', resetPassword);
router.post("/logout", logoutUser);
export default router;
