import express from "express";
import path from "path";

import { getUser, getAllUsers } from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";
import {verifyEmail, requestPasswordReset, changePassword, resetPassword } from "../controllers/user.js"
 
const router = express.Router();
const __dirname = path.resolve(path.dirname(""));


router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);


//EMAIL VERIFICATION
router.get("/verify/:userId/:token", verifyEmail);


// PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);


router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });
  
  router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });

export default router;
