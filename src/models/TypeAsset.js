import { DataTypes } from 'sequelize';

import db from "../db/db.js";

const TypeAsset = db.define('TypeAssets', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }

});

export default TypeAsset;
