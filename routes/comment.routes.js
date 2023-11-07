import express from "express";

import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPost,
  replyPostComment,
  likePostComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comments", createComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);
router.get("/comments/:postId", getCommentsForPost);

router.post("/reply-comment/:id", replyPostComment);
router.post("/like-comment/:id/:rid?", likePostComment);


export default router;
