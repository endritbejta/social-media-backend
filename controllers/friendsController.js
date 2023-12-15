import FriendRequest from "../models/friendRequest.js";
import Users from "../models/User.js";

export const friendRequest = async (req, res, next) => {
  console.log(req.body);
  try {
    const { userId } = req.body.user;
    const { requestTo } = req.body;

    const requestExist = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    if (requestExist) {
      next("Friend Request already sent.");
      return;
    }

    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (accountExist) {
      next("Friend Request already sent.");
      return;
    }

    const newRes = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    res.status(201).json({
      success: true,
      message: "Friend Request sent successfully",
      data: newRes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth  request error",
      success: false,
      error: error.message,
    });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const request = await FriendRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestFrom",
        select: "firstName lastName profilePicture",
      })
      .limit(10)
      .sort({
        _id: -1,
      });

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth getreq error",
      success: false,
      error: error.message,
    });
  }
};

export const acceptRequest = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const { rid, status } = req.body;

    const requestExist = await FriendRequest.findById(rid);

    if (!requestExist) {
      next("No Friend Request Found.");
      return;
    }

    const accountAccepted = await FriendRequest.findOne({
      _id: rid,
      requestStatus: "Accepted",
    });

    if (accountAccepted) {
      next("You already are friend with this user.");
      return;
    }

    const newRes = await FriendRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );

    if (status === "Accepted") {
      const user = await Users.findById(id);

      user.friends.push(newRes?.requestFrom);

      await user.save();
      const friend = await Users.findById(newRes?.requestFrom);

      friend.friends.push(newRes?.requestTo);

      await friend.save();
    }

    // ! reject added
    if (status === "Rejected") {
      const user = await FriendRequest.findByIdAndDelete(newRes);
    }

    res.status(201).json({
      success: true,
      message: "Friend Request " + status,
      data: newRes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth accept error",
      success: false,
      error: error.message,
    });
  }
};

export const getSentFriendRequests = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const sentRequests = await FriendRequest.find({
      requestFrom: userId,
      requestStatus: "Pending",
    })
      .populate({
        path: "requestTo",
        select: "firstName lastName profilePicture",
      })
      .limit(10)
      .sort({
        _id: -1,
      });

    res.status(200).json({
      success: true,
      data: sentRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching sent friend requests",
      success: false,
      error: error.message,
    });
  }
};

export const cancelRequest = async (req, res) => {
  try {
    const { rid } = req.body;
    const response = await FriendRequest.findByIdAndDelete({ _id: rid });

    res.status(201).json({
      success: true,
      message: "Friend Request canceled",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth cancel error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const id = req.body.user.userId;
    const { did } = req.body;
    const user = await Users.findById(id);
    const friend = await Users.findById(did);

    user.friends.remove(did);
    await user.save();

    friend.friends.remove(id);
    await friend.save();

    await FriendRequest.findOneAndDelete({
      $or: [
        { requestFrom: id, requestTo: did },
        { requestFrom: did, requestTo: id },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Friend Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth delete error",
      success: false,
      error: error.message,
    });
  }
};

export const profileViews = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await Users.findById(id);

    if (id !== userId && !user.views.includes(userId)) {
      user.views.push(userId);
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

export const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;

    let queryObject = {};

    queryObject._id = { $ne: userId };

    queryObject.friends = { $nin: userId };

    let queryResult = Users.find(queryObject)
      .limit(4)
      .select("firstName lastName profilePicture");

    const suggestedFriends = await queryResult;

    res.status(200).json({
      success: true,
      data: suggestedFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
