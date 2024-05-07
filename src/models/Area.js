import { DataTypes } from 'sequelize';

import db from '../config/db.js';

const Area = db.define('Areas', {
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

export default Area;
