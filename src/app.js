import express from 'express';
import { publicPath } from './utils/utils.js';
import config from './config/config.js';
import usersRouter from './routes/users.routes.js';
import db from './config/db.js';
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable PUG
app.set('view engine', 'pug');
app.set('views', './src/views');

// Routes
app.use('/auth', usersRouter);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});
