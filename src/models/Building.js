import { DataTypes } from 'sequelize';

import db from "../db/db.js";

const Building = db.define('Buildings', {
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


export default Building;
