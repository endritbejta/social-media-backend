import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors());

// Logging
app.use(morgan("common"));

// Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);

const PORT = process.env.PORT || 9999;

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)))
  .catch((err) => console.log(`${err}: did not connect.`));
