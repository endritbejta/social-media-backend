import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { text, post_id } = req.body;
    const author = req.user._id;

    const comment = new Comment({
      text,
      post_id,
      author,
    });

    const newComment = await comment.save();

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    return res.json(updatedComment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCommentsForPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const comments = await Comment.find({ post_id });

    return res.json(comments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
