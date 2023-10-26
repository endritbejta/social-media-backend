import express from "express";

import { getUser, getAllUsers } from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);

export default router;
