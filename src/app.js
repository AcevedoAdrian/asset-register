import express from "express";
import config from "./config/config.js";
// Create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to express app" });
} );

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});


