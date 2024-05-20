import { validationResult } from 'express-validator';
import { TypeAsset, Area, Building, Asset, User } from '../models/index.js';
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
    res.redirect('/assets/list');
  } catch (error) {
    console.log(error);
  }
};

const listAssets = async (req, res) => {
  const { page } = req.query;
  console.log(req.query.page);
  const regularExpressionPaginate = /^[0-9]+$/; // Regular expression to validate that the page is a number greater than 0 and not a string or other type of data type that is not a number or integer

  if (!regularExpressionPaginate.test(page)) {
    return res.redirect('/assets/list?page=1');
  }
  try {
    const limit = 5;
    // Calculate the number of assets to display per page
    // const offset = ((page * limit) - limit);
    const offset = (page - 1) * limit;
    const [assets, totalAsset] = await Promise.all(
      [
      // Find all the assets that are not active
        Asset.findAll(
          {
            limit,
            offset,
            where: {
              active: 0
            },
            include: [
              { model: TypeAsset, attributes: ['name'] },
              { model: Area, attributes: ['name'] },
              { model: Building, attributes: ['name'] }

            ]
          }),

        Asset.count({
          where: {
            active: 0
          }
        })
      ]
    );

    const pages = Math.ceil(totalAsset / limit);
    console.log(totalAsset);

    res.render('assets/list', {
      namePage: 'Listado de Bienes',
      authenticated: true,
      assets,
      pages,
      page,
      totalAsset,
      limit,
      offset
    });
  } catch (error) {
    console.log(error);
  }
};

const formEditAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findByPk(id);
  if (!asset) {
    res.redirect('/assets/list');
  }

  if (asset.userId.toString() !== req.user.id.toString()) {
    res.redirect('/assets/list');
  }

  const [typeAssets, areas, buildings] = await Promise.all([ // Destructure the array of promises
    TypeAsset.findAll(),
    Area.findAll(),
    Building.findAll()
  ]);

  res.render('assets/edit', {
    authenticated: true,
    typeAssets,
    areas,
    buildings,
    data: asset
  });
};

const editAsset = async (req, res) => {
  const resultError = validationResult(req);
  if (!resultError.isEmpty()) {
    const [typeAssets, areas, buildings] = await Promise.all([ // Destructure the array of promises
      TypeAsset.findAll(),
      Area.findAll(),
      Building.findAll()
    ]);
    res.render('assets/edit', {
      namePage: 'Editar Bien',
      errors: resultError.array(),
      authenticated: true,
      typeAssets,
      areas,
      buildings,
      data: req.body
    });
  }

  const { id } = req.params;
  const asset = await Asset.findByPk(id);
  if (!asset) {
    res.redirect('/assets/list');
  }

  if (asset.userId.toString() !== req.user.id.toString()) {
    res.redirect('/assets/list');
  }

  try {
    const userId = req.user.id;
    const { inventory, typeAsset: typeAssetId, area: areaId, building: buildingId, serial, status, description } = req.body;
    asset.set(
      {
        inventory,
        typeAssetId,
        areaId,
        buildingId,
        serial,
        status,
        description,
        userId
      });
    await asset.save();
    res.redirect('/assets/list');
  } catch (error) {
    console.log(error);
  }
};

const deleteAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findByPk(id);
  if (!asset) {
    res.redirect('/assets/list');
  }

  if (asset.userId.toString() !== req.user.id.toString()) {
    res.redirect('/assets/list');
  }
  try {
    asset.active = 1;
    await asset.save();
    // return res.redirect('/assets/list');
    return res.status(200).json({ status: 200, message: 'Bien eliminado con éxito' });
  } catch (error) {
    console.log(error);
  }
};

const formViewAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findByPk(id,
    {
      include: [
        { model: TypeAsset, attributes: ['name'] },
        { model: Area, attributes: ['name'] },
        { model: Building, attributes: ['name'] }
      ]
    }
  );
  if (!asset) {
    res.redirect('/404');
  }

  if (asset.userId.toString() !== req.user.id.toString()) {
    res.redirect('/assets/list');
  }

  res.render('assets/view', {
    namePage: 'Ver Bien',
    authenticated: true,
    data: asset
  });
};

export {
  formCreateAsset,
  createAsset,
  listAssets,
  formEditAsset,
  editAsset,
  deleteAsset,
  formViewAsset
};
