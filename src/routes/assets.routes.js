import express from 'express';

import { assetsCreate } from '../controllers/assets.controller.js';

const router = express.Router();

router.get('/create', assetsCreate);

export default router;
