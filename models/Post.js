import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    pictures: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        default: [],
      },
    ],
    userProfilePicture: [{ type: String }],

  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
