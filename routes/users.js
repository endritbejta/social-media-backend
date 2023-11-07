import express from "express";

import { getUser, getAllUsers } from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";
import {verifyEmail, requestPasswordReset, changePassword, resetPassword } from "../controllers/user.js"
 
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);


//EMAIL VERIFICATION
router.get("/verify/:userId/:token", verifyEmail);

// PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

export default router;
