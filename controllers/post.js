import Post from "../models/Post.js";
import User from "../models/User.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import SavedPost from "../models/SavedPost.js";

// import { insertMultipleObjects } from "../aws/S3Client.js";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// export const createPost = async (req, res) => {
//   try {
//     let pictures = [];

//     console.log("req.files", req.files);
//     console.log("req.body", req.body);

//     // If there are any pictures, store them to S3
//     if (req.files) {
//       const keys = await insertMultipleObjects(req.files);
//       pictures = keys;
//     }

//     const newPost = new Post({
//       userId: req.body.userId,
//       description: req.body.description,
//       pictures,
//     });

//     await newPost.save();

//     return res.status(201).json(newPost);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDirectory = path.join(__dirname, "../uploads");

export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const pictures = req.files;

    if (!userId || !description) {
      return res
        .status(400)
        .json({ message: "UserId and description are required." });
    }

    const pictureUrls = [];

    if (pictures && pictures.length > 0) {
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
      }

      pictures.forEach((file, index) => {
        const ext = path.extname(file.originalname);
        const fileName = `image_${Date.now()}_${index}${ext}`;

        const filePath = path.join(uploadDirectory, fileName);
        fs.writeFileSync(filePath, file.buffer);

        const fileUrl = `/uploads/${fileName}`;
        pictureUrls.push(fileUrl);
      });
    }

    const newPost = new Post({
      userId,
      description,
      pictures: pictureUrls,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getPostPictures = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const pictures = post.pictures;

    return res.status(200).json(pictures);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("likes").populate("comments");
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.postId;
    const post = await Post.findOne({ _id: id })
      .populate("likes")
      .populate("comments");
    if (!post) {
      return res.status(404).json({ error: "Post does not exist" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate("likes")
      .populate("comments");
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { description, picture } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (description !== undefined) {
      post.description = description;
    }

    if (picture !== undefined) {
      post.picture = picture;
    }
    post.updatedAt = new Date();

    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const savedPost = await SavedPost.findOne({ $where: { postId, userId } });
    if (savedPost !== null) {
      return res.status(400).json({ message: "Post is already saved" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const newSavedPost = new SavedPost({
      postId,
      userId,
      folderId: req.body.folderId,
    });

    await newSavedPost.save();

    return res.status(200).json({ message: "Post saved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const savedPost = await SavedPost.findOne({ $where: { postId, userId } });
    if (savedPost === null) {
      return res.status(404).json({ message: "Post is not saved" });
    }

    await SavedPost.deleteOne({ $where: { _id: savedPost._id } });

    return res.status(200).json({ message: "Post unsaved" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const like = await Like.findOne({
      postId,
      userId,
    });

    if (like !== null) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const newLike = new Like({
      postId,
      userId,
    });

    newLike.save();
    return res.status(201).json({ message: "Post liked", newLike });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const like = await Like.findOne({
      postId,
      userId,
    });

    if (like === null) {
      return res.status(400).json({ message: "Post is not liked" });
    }

    await Like.deleteOne({ _id: like._id });
    return res.status(201).json({ message: "Post unliked" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getLikesForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const likes = await Like.find({ postId }).populate({
      path: "userId",
      select: "firstName lastName",
    });

    const getLikes = likes.map((like) => {
      return {
        userId: like.userId._id,
        firstName: like.userId.firstName,
        lastName: like.userId.lastName,
      };
    });

    return res.status(200).json(getLikes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
