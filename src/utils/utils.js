import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const publicPath = path.join(__dirname, '../public');

const salt = await bcrypt.genSalt(10);
export const hashPassword = async (password) => {
  return bcrypt.hash(password, salt);
};
