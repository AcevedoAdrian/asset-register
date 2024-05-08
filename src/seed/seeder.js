import { exit, argv } from 'node:process';
import area from './area.js';
import Area from '../models/Area.js';
import db from '../config/db.js';

const importArea = async () => {
  try {
    await db.authenticate();
    await db.sync();
    await Area.bulkCreate(area);
    console.log('Area imported');
    exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};

if (argv[2] === '-i') {
  console.log('Importing area');
  importArea();
}
