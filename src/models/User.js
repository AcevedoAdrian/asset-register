import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from "../db/db.js";

const User = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Este campo no puede ir bacio
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: [
            "password",
            "token",
            "confirmed",
            "active",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    },
  }
);
// Methods to compare the password
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default User;
