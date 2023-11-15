import mongoose from "mongoose";
import Notification from "../models/notificationModel.js";



  export default async function createLikeNotification(userId, postId, postOwnerId) {
  try {
    // Create a new notification
    const newNotification = new Notification({
      userId: postOwnerId, // User who should receive the notification
      message:`${userId} liked your post` , // Customize the notification message
      postId: postId, // ID of the post being liked
      type: 'like', // You can add more types for different actions
      read: false, // Notification is initially unread
    });

    // Save the notification to the database
    await newNotification.save();

    console.log('Notification created:', newNotification);

    // You can also emit a socket.io event or use a message queue to notify the user in real-time

    return newNotification;
  } catch (error) {
    console.error('Error creating like notification:', error);
    throw error;
  }
}


export  async function createCommentNotification(userId, postId, postOwnerId) {
  try {
    // Create a new notification
    const newNotification = new Notification({
      userId: postOwnerId, // User who should receive the notification
      message:`${userId} coment your post` , // Customize the notification message
      postId: postId, // ID of the post being liked
      type: 'like', // You can add more types for different actions
      read: false, // Notification is initially unread
    });

    // Save the notification to the database
    await newNotification.save();

    console.log('Notification created:', newNotification);

    // You can also emit a socket.io event or use a message queue to notify the user in real-time

    return newNotification;
  } catch (error) {
    console.error('Error creating like notification:', error);
    throw error;
  }
}


  

  
