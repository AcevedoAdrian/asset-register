import express from 'express';
import validateAsset from '../middleware/validateAsset.js';
import {
  formCreateAsset,
  createAsset,
  listAssets,
  editAsset,
  formEditAsset,
  deleteAsset,
  formViewAsset,
  searchAsset
} from '../controllers/assets.controller.js';

const router = express.Router();

router.get('/create', formCreateAsset);
router.post('/create', validateAsset, createAsset);
router.get('/list', listAssets);
router.get('/edit/:id', formEditAsset);
router.post('/edit/:id', validateAsset, editAsset);
router.delete('/delete/:id', deleteAsset);
router.get('/view/:id', formViewAsset);
router.get('/search', searchAsset);

export default router;
