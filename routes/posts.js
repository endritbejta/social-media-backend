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
router.get("/posts/:userId", readUserPosts);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

export default router;
