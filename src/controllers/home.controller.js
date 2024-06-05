import { Asset, TypeAsset, Area, Building } from '../models/index.js';

const homeController = async (req, res) => {
  const assets = await Asset.findAll({
    where: {
      active: true,
    },
    include: [
      { model: TypeAsset, attributes: ["name"] },
      { model: Area, attributes: ["name"] },
      { model: Building, attributes: ["name"] },
    ],
  });
  try {
    res.render('home/index', {
      namePage: 'Listado de Activoss',
      assets
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  homeController
};
