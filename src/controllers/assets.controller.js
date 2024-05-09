import TypeAsset from '../models/TypeAsset.js';
import Area from '../models/Area.js';
import Building from '../models/Building.js';

// Form for creating a new asset (GET)
const assetsCreate = async (req, res) => {
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
    buildings
  });
};

export { assetsCreate };
