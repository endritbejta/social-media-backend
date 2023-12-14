import mongoose from "mongoose";
import Notification from "../models/notificationModel.js";

// Function to create a like notification
export default async function createLikeNotification(userId, postId, postOwnerId) {
  try {
    const newNotification = new Notification({
      userId: postOwnerId,
      message: `${userId} liked your post`,
      postId: postId,
      type: 'like',
      read: false,
    });

    await newNotification.save();

    return newNotification;
  } catch (error) {
    console.error('Error creating like notification:', error);
    throw error;
  }
}
export async function createCommentNotification(userId, postId, postOwnerId) {
  try {
    const newNotification = new Notification({
      userId: postOwnerId,
      message: `${userId} commented on your post`,
      postId: postId,
      type: 'comment',
      read: false,
    });

    await newNotification.save();

    console.log('Comment Notification created:', newNotification);

    // You can fire socket.io events or use a message queue for real-time notifications

    return newNotification;
  } catch (error) {
    console.error('Error creating comment notification:', error);
    throw error;
  }
}
// // Function to create a comment notification
// export async function createCommentNotification(userId, postId, postOwnerId) {
//   try {
//     const newNotification = new Notification({
//       userId: postOwnerId,
//       message: `${userId} commented on your post`,
//       postId: postId,
//       type: 'comment',
//       read: false,
//     });

//     await newNotification.save();

//     console.log('Comment Notification created:', newNotification);

//     // You can fire socket.io events or use a message queue for real-time notifications

//     return newNotification;
//   } catch (error) {
//     console.error('Error creating comment notification:', error);
//     throw error;
//   }
// }

// // Function to create a share notification
// export async function createShareNotification(userId, postId, postOwnerId) {
//   try {
//     const newNotification = new Notification({
//       userId: postOwnerId,
//       message: `${userId} shared your post`,
//       postId: postId,
//       type: 'share',
//       read: false,
//     });

//     await newNotification.save();

//     console.log('Share Notification created:', newNotification);

//     // You can fire socket.io events or use a message queue for real-time notifications

//     return newNotification;
//   } catch (error) {
//     console.error('Error creating share notification:', error);
//     throw error;
//   }
// }

// // Function to create a friend request notification
// export async function createFriendRequestNotification(senderId, recipientId) {
//   try {
//     const newNotification = new Notification({
//       userId: recipientId,
//       message: `${senderId} sent you a friend request`,
//       type: 'friendRequest',
//       read: false,
//     });

//     await newNotification.save();

//     console.log('Friend Request Notification created:', newNotification);

//     // You can fire socket.io events or use a message queue for real-time notifications

//     return newNotification;
//   } catch (error) {
//     console.error('Error creating friend request notification:', error);
//     throw error;
//   }
// }

// // Function to create a post notification
// export async function createPostNotification(userId, postId, postOwnerId) {
//   try {
//     const newNotification = new Notification({
//       userId: postOwnerId,
//       message: `${userId} created a new post`,
//       postId: postId,
//       type: 'post',
//       read: false,
//     });

//     await newNotification.save();

//     console.log('Post Notification created:', newNotification);

//     // You can fire socket.io events or use a message queue for real-time notifications

//     return newNotification;
//   } catch (error) {
//     console.error('Error creating post notification:', error);
//     throw error;
//   }
// }
