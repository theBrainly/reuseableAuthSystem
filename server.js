import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import "./config/passportConfig.js"; // Import Passport Config

dotenv.config();
connectDB();

const app = express();

// 🔹 Enable Sessions (Stored in MongoDB)
app.use(session({
    secret: process.env.SESSION_SECRET, // Keep it strong & secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Ensure this is correct
      ttl: 14 * 24 * 60 * 60, // Session expiration (14 days)
    }),
    cookie: {
      secure: false, // Change to `true` in production with HTTPS
      httpOnly: true, 
    },
  }));
// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // 🔹 Enable Passport sessions

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", googleAuthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
