import { exit, argv } from 'node:process';

import Area from '../models/Area.js';
import Edifice from '../models/Edifice.js';
import TypeAsset from '../models/TypeAsset.js';

import area from './areas.js';
import edifice from './edifices.js';
import typeAsset from './typeassets.js';
import db from '../config/db.js';

const importData = async () => {
  try {
    await db.authenticate();
    await db.sync();

    await Promise.all([
      Area.bulkCreate(area),
      Edifice.bulkCreate(edifice),
      TypeAsset.bulkCreate(typeAsset)
    ]);
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};

const deleteData = async () => {
  try {
    await Promise.all([
      Area.destroy({ where: {}, truncate: true }),
      Edifice.destroy({ where: {}, truncate: true }),
      TypeAsset.destroy({ where: {}, truncate: true })
    ]);
    // await db.sync({ force: true }); // Force sync to reset autoincrement
    console.log('Data Deleted Successfully');
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};
if (argv[2] === '-i') {
  console.log('Importing Data');
  importData();
}
if (argv[2] === '-d') {
  console.log('Deleting Data');
  deleteData();
}
