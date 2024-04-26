import express from "express";
import config from "./config/config.js";
import usersRouter from "./router/users.routes.js";

// Create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/users", usersRouter);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});


