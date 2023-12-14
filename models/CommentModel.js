import mongoose, { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    content: { type: String, required: true },
    author: { type: String, ref: "User" },
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        author: { type: String, ref: "User" },
        content: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
      },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    commenterProfilePicture: [{ type: String }],
  },
  { timestamps: true },
);

const Comments = mongoose.model("Comments", CommentSchema);

export default Comments;
