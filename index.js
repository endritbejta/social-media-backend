import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/commentRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9999;

app.post("/auth/register", register);

app.use("/auth", authRoutes);
app.use("/", commentRoutes);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(`${err}: did not connect.`));
