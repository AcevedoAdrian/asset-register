import { DataTypes } from 'sequelize';

import db from '../config/db.js';

const Asset = db.define('Assets', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  inventory: {
    type: DataTypes.INTEGER(15),
    allowNull: false
  },
  surveyDate: {
    type: DataTypes.DATE,
    format: 'DD/MM/YYYY',
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serial: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }

});

export default Asset;
