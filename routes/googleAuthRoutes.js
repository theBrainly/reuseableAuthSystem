import express from "express";
import passport from "passport";

const router = express.Router();

// ✅ Redirect to Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login-failed",
  }), (req, res) => {
    console.log("✅ User authenticated:", req.user);
    res.redirect("http://localhost:3000/dashboard");
  });
  
// ✅ Check Session Status (Is User Logged In?)
router.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// ✅ Logout Route (Fix)
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });

      res.clearCookie("connect.sid"); // Remove session cookie
      res.json({ message: "Logged out successfully" });
    });
  });
});

export default router;
