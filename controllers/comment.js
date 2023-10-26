import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const author = req.userId;

    const comment = new Comment({
      content,
      postId,
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
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
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
    const { postId } = req.params;

    const comments = await Comment.find({ postId });

    return res.json(comments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
