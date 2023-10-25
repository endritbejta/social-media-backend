import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picture } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      userId,
      description,
      picture,
      likes: {},
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const readPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const readUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (!post.savedBy.includes(userId)) {
      post.savedBy.push(userId);
      await post.save();
    }
    res.status(200).json({ message: "Post saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeSavePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    const userIndex = post.savedBy.indexOf(userId);
    if (userIndex !== -1) {
      post.savedBy.splice(userIndex, 1);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//@route PUT api/post/like/:Id
//@desc Like a post
//@access Private

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post) return res.status(400).json({msg: 'Post not found'});
    
    // check if the post has already been liked
    const user = await User.findById(req.user.id);
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({msg: 'Post already liked'});
    }

    post.likes.unshift({user: req.user.id});
    await post.save();
    res.json({msg: 'Like added'});

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
export const unlikePost = async (req, res) => {
   try {
     const post = await Post.findById(req.params.id);

     if(!post) return res.status(400).json({msg: 'Post not found'});

     // check if the post has already been liked by the user
     const index = post.likes.findIndex(like => like.user.toString() === req.user.id);
     if(index === -1) return res.status(400).json({msg: 'Post not yet liked'});
     
     // Remove like from array of likes
     post.likes.splice(index, 1);
     
     // Return a response
     res.json({msg: 'Like removed'});

   } catch (err) {
     console.error(err);
     res.status(500).send('Server error');
   }
}
