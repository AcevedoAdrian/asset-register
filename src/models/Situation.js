import { DataTypes } from 'sequelize';

import db from '../config/db.js';

const Situation = db.define('Situations', {
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

export default Situation;