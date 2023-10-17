import express from 'express';

import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForPost,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/comments', createComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);
router.get('/comments/:post_id', getCommentsForPost);

export default router;
