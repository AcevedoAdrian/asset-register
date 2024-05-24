import { validationResult } from 'express-validator';
import { TypeAsset, Area, Building, Asset, User, Weighting, State, Situation } from '../models/index.js';
// Form for creating a new asset (GET)
const formCreateAsset = async (req, res) => {
  const [
    areas,
    buildings,
    situations,
    states,
    typeAssets,
    weightings
  ] = await Promise.all([ // Destructure the array of promises
    Area.findAll(),
    Building.findAll(),
    Situation.findAll(),
    State.findAll(),
    TypeAsset.findAll(),
    Weighting.findAll()
  ]);

  res.render('assets/create', {
    namePage: 'Registrar Bien',
    message: 'Welcome to the create asset page',
    authenticated: true,
    typeAssets,
    areas,
    buildings,
    weightings,
    states,
    situations,
    data: {}
  });
};

// Create a new asset (POST)
const createAsset = async (req, res) => {
  const resultError = validationResult(req);
  if (!resultError.isEmpty()) {
    const [
      areas,
      buildings,
      situations,
      states,
      typeAssets,
      weightings
    ] = await Promise.all([ // Destructure the array of promises
      Area.findAll(),
      Building.findAll(),
      Situation.findAll(),
      State.findAll(),
      TypeAsset.findAll(),
      Weighting.findAll()
    ]);
    // If there are errors, the form is displayed again with the error messages
    return res.render('assets/create', {
      namePage: 'Registrar Bien',
      errors: resultError.array(),
      authenticated: true,
      typeAssets,
      areas,
      buildings,
      situations,
      states,
      weightings,
      data: req.body
    });
  }

  const surveyDate = req.body.surveyDate.slice(0, 10).replace('T', '') || new Date().toJSON().slice(0, 10).replace('T', ' ');

  try {
    // Create a new asset
    const asset = await Asset.create({
      areaId: req.body.area,
      buildingId: req.body.building,
      description: req.body.description,
      inventory: req.body.inventory,
      invoiceNumber: req.body.invoiceNumber,
      serial: req.body.serial,
      situationId: req.body.situation,
      stateId: req.body.state,
      surveyDate,
      typeAssetId: req.body.typeAsset,
      userId: req.user.id,
      weightingId: req.body.weighting
    });
    // Redirect to the list of assets
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
              { model: Building, attributes: ['name'] },
              { model: Weighting },
              { model: State, attributes: ['name'] },
              { model: Situation, attributes: ['name'] }

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

    res.render('assets/list', {
      namePage: 'Listado de Bienes',
      authenticated: true,
      assets,
      pages,
      page: Number(page),
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

  const [
    areas,
    buildings,
    situations,
    states,
    typeAssets,
    weightings
  ] = await Promise.all([ // Destructure the array of promises
    Area.findAll(),
    Building.findAll(),
    Situation.findAll(),
    State.findAll(),
    TypeAsset.findAll(),
    Weighting.findAll()
  ]);

  res.render('assets/edit', {
    namePage: 'Editar Bien',
    authenticated: true,
    typeAssets,
    areas,
    buildings,
    weightings,
    states,
    situations,
    data: asset
  });
};

const editAsset = async (req, res) => {
  const resultError = validationResult(req);
  if (!resultError.isEmpty()) {
    const [
      areas,
      buildings,
      situations,
      states,
      typeAssets,
      weightings
    ] = await Promise.all([ // Destructure the array of promises
      Area.findAll(),
      Building.findAll(),
      Situation.findAll(),
      State.findAll(),
      TypeAsset.findAll(),
      Weighting.findAll()
    ]);
    res.render('assets/edit', {
      namePage: 'Editar Bien',
      errors: resultError.array(),
      authenticated: true,
      typeAssets,
      areas,
      buildings,
      weightings,
      states,
      situations,
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
    const {
      area: areaId,
      building: buildingId,
      description,
      inventory,
      invoiceNumber,
      serial,
      situation: situationId,
      state: stateId,
      surveyDate,
      typeAsset: typeAssetId,
      weighting: weightingId
    } = req.body;

    asset.set(
      {
        areaId,
        buildingId,
        description,
        inventory,
        invoiceNumber,
        serial,
        situationId,
        stateId,
        surveyDate,
        typeAssetId,
        userId,
        weightingId
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
        { model: Building, attributes: ['name'] },
        { model: Weighting, attributes: ['name'] },
        { model: State, attributes: ['name'] },
        { model: Situation, attributes: ['name'] }
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
