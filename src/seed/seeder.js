import { exit, argv } from 'node:process';

import { Area, Asset, Building, TypeAsset, User, Situation, State, Weighting } from '../models/index.js';

import area from './areas.js';
import building from './buildings.js';
import typeAsset from './typeassets.js';
import user from './users.js';
import situation from './situations.js';
import states from './states.js';
import weighting from './weightings.js';
import assets from './assets.js';
import db from '../config/db.js';
import Role from "../models/Role.js";
import roles from "./roles.js";

const importData = async () => {
  try {
    await db.authenticate();
    await db.sync();

    await Promise.all([
      Area.bulkCreate(area),
      Building.bulkCreate(building),
      TypeAsset.bulkCreate(typeAsset),
      User.bulkCreate(user),
      Situation.bulkCreate(situation),
      State.bulkCreate(states),
      Weighting.bulkCreate(weighting),
      Role.bulkCreate(roles),
    ]);
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};

const importAsset = async () => {
  try {
    await db.authenticate();
    await db.sync();

    await Promise.all([
      Asset.bulkCreate(assets)
    ]);
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};

const deleteData = async () => {
  try {
    // await Promise.all([
    //   Asset.destroy({ where: {}, truncate: true, force: true }),
    //   User.destroy({ where: {}, truncate: true, force: true }),
    //   Area.destroy({ where: {}, truncate: true, force: true }),
    //   Building.destroy({ where: {}, truncate: true, force: true }),
    //   TypeAsset.destroy({ where: {}, truncate: true, force: true })
    // ]);
    await db.sync({ force: true }); // Force sync to reset autoincrement
    console.log('Data Deleted Successfully');
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};

if (argv[2] === '-a') {
  console.log('Importing Asset');
  importAsset();
}

if (argv[2] === '-i') {
  console.log('Importing Data');
  importData();
}
if (argv[2] === '-d') {
  console.log('Deleting Data');
  deleteData();
}
