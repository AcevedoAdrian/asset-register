import Area from './Area.js';
import Asset from './Asset.js';
import Building from './Building.js';
import TypeAsset from './TypeAsset.js';
import User from './User.js';
import Situation from './Situation.js';
import Status from './Status.js';
import Weighting from './Weighting.js';

Asset.belongsTo(Area, { foreignKey: 'areaId' });
Asset.belongsTo(Building, { foreignKey: 'buildingId' });
Asset.belongsTo(TypeAsset, { foreignKey: 'typeAssetId' });
Asset.belongsTo(User, { foreignKey: 'userId' });
Asset.belongsTo(Situation, { foreignKey: 'situationId' });
Asset.belongsTo(Status, { foreignKey: 'statusId' });
Asset.belongsTo(Weighting, { foreignKey: 'weightingId' });

export { Area, Asset, Building, TypeAsset, User };
