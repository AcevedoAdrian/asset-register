import express from 'express';
import validateAsset from '../middleware/validateAsset.js';
import { formCreateAsset, createAsset, listAssets, editAsset, formEditAsset, deleteAsset, formViewAsset } from '../controllers/assets.controller.js';

const router = express.Router();

router.get('/create', formCreateAsset);
router.post('/create', validateAsset, createAsset);
router.get('/list', listAssets);
router.get('/edit/:id', formEditAsset);
router.post('/edit/:id', validateAsset, editAsset);
router.post('/delete/:id', deleteAsset);
router.get('/view/:id', formViewAsset);

export default router;
