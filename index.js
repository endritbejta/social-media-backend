import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { dbConnection } from "./lib/dbConfig.js";
import { login, register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

import commentRoutes from "./routes/comment.routes.js";
import homeRoutes from './routes/home.routes.js'

dotenv.config();

dbConnection();


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9999;

app.post("/auth/register", register);
app.use("/auth", authRoutes);


app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.use("/", commentRoutes);
app.use('/home', homeRoutes);


app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});


mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(`${err}: did not connect.`));
