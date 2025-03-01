import express from "express";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Example Protected Route (Only Authenticated Users Can Access)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user, // Returns logged-in user data
  });
});

export default router;
