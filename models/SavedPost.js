import mongoose, { Schema } from "mongoose";

const SavedPostSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const SavedPost = mongoose.model("SavedPost", SavedPostSchema);

export default SavedPost;
