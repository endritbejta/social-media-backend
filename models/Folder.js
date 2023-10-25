import mongoose, { Schema } from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavedPost",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
