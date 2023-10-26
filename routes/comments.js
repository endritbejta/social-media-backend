import express from "express";

import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPost,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/comments", createComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);
router.get("/comments/:postId", getCommentsForPost);

export default router;
