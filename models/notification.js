import mongoose from "mongoose";
import Notification from "../models/notificationModel.js";



  export default async function createLikeNotification(userId, postId, postOwnerId) {
  try {
   
    const newNotification = new Notification({
      userId: postOwnerId,
      message:`${userId} liked your post` , 
      postId: postId, 
      type: 'like', 
      read: false, 
    });

    await newNotification.save();

    console.log('Notification created:', newNotification);

    return newNotification;
  } catch (error) {
    console.error('Error creating like notification:', error);
    throw error;
  }
}


export  async function createCommentNotification(userId, postId, postOwnerId) {
  try {
    const newNotification = new Notification({
      userId: postOwnerId, 
      message:`${userId} comment your post` , 
      postId: postId, 
      type: 'like', 
      read: false, 
    });

    await newNotification.save();

    console.log('Notification created:', newNotification);

    return newNotification;
  } catch (error) {
    console.error('Error creating like notification:', error);
    throw error;
  }
}


  

  
