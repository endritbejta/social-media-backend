import Post from "../models/Post.js";
import User from "../models/User.js";

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
