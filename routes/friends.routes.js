import express from "express";
import verifyToken from "../middleware/auth.js";

import {
  friendRequest,
  getFriendRequest,
  acceptRequest,
  profileViews,
  suggestedFriends,
} from "../controllers/friendsController.js";

const router = express.Router();

// friend request
router.post("/friend-request", verifyToken, friendRequest);
router.post("/get-friend-request", verifyToken, getFriendRequest);

// accept / deny friend request
router.post("/accept-request", verifyToken, acceptRequest);

// view profile
router.post("/profile-view", verifyToken, profileViews);

//suggested friends
router.post("/suggested-friends", verifyToken, suggestedFriends);

export default router;
