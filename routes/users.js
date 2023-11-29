import express from "express";
import path from "path";

import {
  getUser,
  getAllUsers,
  createUserAbout,
  getUserAbout,
  updateUserAbout,
  verifyUserManually,
  deleteUser,
  deleteUserAbout,
} from "../controllers/user.js";
import { getUserPosts } from "../controllers/post.js";
import { verifyEmail } from "../controllers/user.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__filename);
const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUser);
router.get("/users/:userId/posts", getUserPosts);
router.post("/users/:userId/about", createUserAbout);
router.get("/users/:userId/about", getUserAbout);
router.put("/users/:userId/about", updateUserAbout);
router.put("/users/:userId/", verifyUserManually);
router.delete("/users/:userId", deleteUser);
router.delete("/users/:aboutId", deleteUserAbout);

// router.get("/verified", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/build", "index.html"));
// });

router.get("/verified", (req, res) => {
  const filePath = path.join(__dirname, "../views/build", "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error serving HTML file");
    }
  });
});

//EMAIL VERIFICATION
router.get("/users/verify/:userId/:token", verifyEmail);

// PASSWORD RESET
// router.post("/request-passwordreset", requestPasswordReset);
// router.get("/reset-password/:userId/:token", resetPassword);
// router.post("/reset-password", changePassword);

export default router;
