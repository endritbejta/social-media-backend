import express from "express";

import { getUser, getAllUsers } from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";
import {verifyEmail } from "../controllers/user.js"
 
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);


//EMAIL VERIFICATION
router.get("/users/verify/:userId/:token", verifyEmail);


// PASSWORD RESET
// router.post("/request-passwordreset", requestPasswordReset);
// router.get("/reset-password/:userId/:token", resetPassword);
// router.post("/reset-password", changePassword);

router.get("/users/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });

export default router;
