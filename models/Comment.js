import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    content: { type: String, required: true },
    reply: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
