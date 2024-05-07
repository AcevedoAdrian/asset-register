import { exit } from 'node:process';
import area from './area.js';
import Area from '../models/Area.js';
import db from '../config/db.js';

const importArea = async () => {
  try {
    
    await db.sync({ force: true });
    await Area.bulkCreate(area);
    console.log('Area imported');
    process.exit();
  } catch (error) {
    console.error(error);
    exit(1); // Force exit with error
  }
};
