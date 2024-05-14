import express from 'express';
import validateAsset from '../middleware/validateAsset.js';
import { formCreateAsset, createAsset, listAssets } from '../controllers/assets.controller.js';

const router = express.Router();

router.get('/create', formCreateAsset);
router.post('/create', validateAsset, createAsset);
router.get('/list', listAssets);

export default router;
