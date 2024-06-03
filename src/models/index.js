import Area from './Area.js';
import Asset from './Asset.js';
import Building from './Building.js';
import TypeAsset from './TypeAsset.js';
import User from './User.js';
import Situation from './Situation.js';
import State from './State.js';
import Weighting from './Weighting.js';
import Role from "./Role.js";

Asset.belongsTo(Area, { foreignKey: 'areaId' }, { defaultValue: 1 });
Asset.belongsTo(Building, { foreignKey: 'buildingId' }, { defaultValue: 1 });
Asset.belongsTo(TypeAsset, { foreignKey: 'typeAssetId' }, { defaultValue: 1 });
Asset.belongsTo(User, { foreignKey: 'userId' });
Asset.belongsTo(Situation, { foreignKey: 'situationId' }, { defaultValue: 1 });
Asset.belongsTo(State, { foreignKey: 'stateId' }, { defaultValue: 1 });
Asset.belongsTo(Weighting, { foreignKey: 'weightingId' }, { defaultValue: 1 });

// User.belongsToMany(Role, { through: "UserRoles" });
// Role.belongsToMany(User, { through: "UserRoles" });

export { Area, Asset, Building, TypeAsset, User, Situation, State, Weighting };
