// import express from 'express';
// const router = express.Router();

// import User from '../models/User.js';
// import Post from '../models/Post.js';

// async function getUserData(userId) {
//   try {
//     const user = await User.findById(userId);
//     return user;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// async function getPosts() {
//   try {
//     const posts = await Post.find().populate('comments');
//     return posts;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// router.get('/home', async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const user = await getUserData(userId);

//     // Retrieve posts
//     const posts = await getPosts();

//     res.render('home', { user, posts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// export default router;
