import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
// import "./config/passport.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
// import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
