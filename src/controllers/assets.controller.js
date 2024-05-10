import { validationResult } from 'express-validator';
import { TypeAsset, Area, Building, Asset } from '../models/index.js';
// Form for creating a new asset (GET)
const formCreateAsset = async (req, res) => {
  const [typeAssets, areas, buildings] = await Promise.all([ // Destructure the array of promises
    TypeAsset.findAll(),
    Area.findAll(),
    Building.findAll()
  ]);

  res.render('assets/create', {
    namePage: 'Registrar Bien',
    message: 'Welcome to the create asset page',
    authenticated: true,
    typeAssets,
    areas,
    buildings,
    data: {}
  });
};
// Create a new asset (POST)
const createAsset = async (req, res) => {
  const resultError = validationResult(req);
  if (!resultError.isEmpty()) {
    const [typeAssets, areas, buildings] = await Promise.all([ // Destructure the array of promises
      TypeAsset.findAll(),
      Area.findAll(),
      Building.findAll()
    ]);

    return res.render('assets/create', {
      namePage: 'Registrar Bien',
      message: 'Welcome to the create asset page',
      errors: resultError.array(),
      authenticated: true,
      typeAssets,
      areas,
      buildings,
      data: req.body
    });
  }
  try {
    const asset = await Asset.create({
      inventory: req.body.inventory,
      typeAssetId: req.body.typeAsset,
      areaId: req.body.area,
      buildingId: req.body.building,
      serial: req.body.serial,
      status: req.body.status,
      description: req.body.description,
      userId: req.user.id
    });
  } catch (error) {
    console.log(error);
  }
};
export { formCreateAsset, createAsset };
