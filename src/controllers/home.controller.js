import { Asset, TypeAsset, Area, Building } from '../models/index.js';
const homeController = async (req, res) => {
  const assets = await Asset.findAll(
    {
      where: {
        active: 0
      },
      include: [
        { model: TypeAsset, attributes: ['name'] },
        { model: Area, attributes: ['name'] },
        { model: Building, attributes: ['name'] }

      ]
    });
  try {
    res.render('home', {
      namePage: 'Listado de activos',

      assets
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  homeController
};
