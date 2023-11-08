import express from "express";

import {
  getUser,
  getAllUsers,
  createUserAbout,
  getUserAbout,
  updateUserAbout,
  deleteUserAbout,
} from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);
router.post("/users/:userId/about", createUserAbout);
router.get("/users/:userId/about", getUserAbout);
router.put("/users/:userId/about", updateUserAbout);
router.delete("/users/:aboutId", deleteUserAbout);

export default router;
