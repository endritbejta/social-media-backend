import express from "express";
import {
  createPost,
  readPosts,
  readUserPosts,
  updatePost,
  deletePost,
  savePost,
  removeSavePost,
} from "../controllers/post.js";
import { likePost } from "../controllers/likePost.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", readPosts);
router.get("/posts/:userId", readUserPosts);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

router.post("/posts/:postId/save", savePost);
router.delete("/posts/:postId/unsave", removeSavePost);

router.post("/posts/like",likePost);

export default router;
