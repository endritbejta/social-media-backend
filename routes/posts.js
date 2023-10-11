import express from "express";
import {
  createPost,
  readPosts,
  readUserPosts,
  updatePost,
  deletePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", readPosts);
router.get("/posts/:id", readUserPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
