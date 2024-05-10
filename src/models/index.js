import Area from './Area.js';
import Asset from './Asset.js';
import Building from './Building.js';
import TypeAsset from './TypeAsset.js';
import User from './User.js';

Asset.belongsTo(Area, { foreignKey: 'areaId' });
Asset.belongsTo(Building, { foreignKey: 'buildingId' });
Asset.belongsTo(TypeAsset, { foreignKey: 'typeAssetId' });
Asset.belongsTo(User, { foreignKey: 'userId' });

export { Area, Asset, Building, TypeAsset, User };
