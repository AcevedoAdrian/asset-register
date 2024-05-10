import express from 'express';
import validateAsset from '../middleware/validateAsset.js';
import { formCreateAsset, createAsset } from '../controllers/assets.controller.js';

const router = express.Router();

router.get('/create', formCreateAsset);
router.post('/create', validateAsset, createAsset);

export default router;
