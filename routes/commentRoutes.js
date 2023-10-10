
import express from "express";
const router = express.Router();
import Comment  from '../models/commentModel.js'; 

router.post('/comments', async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      author: req.user._id, 
      post_id: req.body.post_id,
    });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/comments/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/comments/:post_id', async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.post_id });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
