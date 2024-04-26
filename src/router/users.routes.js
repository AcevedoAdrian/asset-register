import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to express app" });
} );

export default router;