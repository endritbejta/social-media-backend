import express from "express";
import multer from "multer";

import {
  getPostPictures,
  createPost,
  getPosts,
  getFeedPosts,
  getPost,
  updatePost,
  deletePost,
  getLikesForPost,
  likePost,
  unlikePost,
  getNotificationsByUserId,
  savePost,
  unsavePost,
  getUserSavedPosts,
  getAllSavedPosts,
} from "../controllers/post.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Post
router.get("/uploads/:postId", getPostPictures);
router.post("/posts", upload.array("pictures", 5), createPost);
router.get("/posts", getPosts);
router.get("/posts/feedPosts", getFeedPosts);
router.get("/posts/:postId", getPost);
router.put("/posts/:postId", upload.array("pictures", 5), updatePost);
router.delete("/posts/:postId", deletePost);

// Post like
router.get("/posts/:postId/likes", getLikesForPost);
router.post("/posts/:postId/like", likePost);
router.delete("/posts/:postId/unlike", unlikePost);

// Save post
router.post("/posts/:postId/save", savePost);
router.delete("/posts/:postId/unsave", unsavePost);
router.get("/savedPosts/:userId", getUserSavedPosts);
router.get("/savedPosts", getAllSavedPosts);

// Get notifications
router.post("/posts/notifications", getNotificationsByUserId);
router.post("/posts/like", likePost);

export default router;
