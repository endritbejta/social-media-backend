import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    content: { type: String, required: true },
    author: { type: String, ref: "Post" },
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        author: { type: String, ref: "Post" },
        content: { type: String },
        likes: [{ type: String }],
      },
    ],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentSchema);

export default Comments;
