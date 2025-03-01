import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin-Only Route
router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

export default router;
