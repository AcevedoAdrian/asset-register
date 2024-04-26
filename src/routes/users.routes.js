import express from 'express';
import { formLogin } from '../controllers/users.controller.js';
import { formRegister } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/login', formLogin );
router.get('/register', formRegister );
export default router;