import express from "express";
import verifyToken from "../middleware/auth.js";

import {
  friendRequest,
  getFriendRequest,
  acceptRequest,
  profileViews,
  suggestedFriends,
  deleteFriend,
  cancelRequest,
  getSentFriendRequests,
} from "../controllers/friendsController.js";

const router = express.Router();

// friend request
router.post("/friend-request", verifyToken, friendRequest);

// get request
router.post("/get-friend-request", verifyToken, getFriendRequest);

// accept / reject friend request
router.post("/accept-request", verifyToken, acceptRequest);

// get send requests
router.post("/get-send-request", verifyToken, getSentFriendRequests);

// cancel friend request
router.post("/cancel-request", verifyToken, cancelRequest);

// delete friend
router.delete("/delete-friend", verifyToken, deleteFriend);

// view profile
router.post("/profile-view", verifyToken, profileViews);

//suggested friends
router.post("/suggested-friends", verifyToken, suggestedFriends);

export default router;
