import express from 'express';
import db from './config/db.js';
import { publicPath } from './utils/utils.js';
import config from './config/config.js';
import homeRouter from './routes/home.routes.js';
import usersRouter from './routes/users.routes.js';
import assetsRouter from './routes/assets.routes.js';
import { cookie } from 'express-validator';
// Create express app
const app = express();

// Connect to database
try {
  await db.authenticate();
  db.sync();
  console.log('Connection a data base has been established successfully.');
} catch (error) {
  console.log(error);
}

// Static files
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie(config.COOKIE_SECRET));

// Enable PUG
app.set('view engine', 'pug');
app.set('views', './src/views');

// Routes
app.use('/', homeRouter);
app.use('/auth', usersRouter);
app.use('/assets', assetsRouter);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});
