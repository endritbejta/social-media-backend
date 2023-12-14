import express from "express";
import multer from "multer";

import {
  getPostPictures,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getLikesForPost,
  likePost,
  unlikePost,
  getNotificationsByUserId,
  savePost,
  unsavePost,
} from "../controllers/post.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Post
router.get("/uploads/:postId", getPostPictures);
router.post("/posts", upload.array("images", 5), createPost);
router.get("/posts", getPosts);
router.get("/posts/:postId", getPost);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

// Post like
router.get("/posts/:postId/likes", getLikesForPost);
router.post("/posts/:postId/like", likePost);
router.delete("/posts/:postId/unlike", unlikePost);

// Save post
router.post("/posts/:postId/save", savePost);
router.delete("/posts/:postId/unsave", unsavePost);

// Get notifications
router.post("/posts/notifications", getNotificationsByUserId);
router.post("/posts/like",likePost);

export default router;
