import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
   userId: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
   },
   message: {
     type: String,
     required: true,
   },
   postId: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
   },
   type: {
     type: String,
     required: true,
   },
   read: {
     type: Boolean,
     default: false,
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
   commentId: {
     type: mongoose.Schema.Types.ObjectId,
   },
   shareId: {
     type: mongoose.Schema.Types.ObjectId,
   },
   friendRequestId: {
     type: mongoose.Schema.Types.ObjectId,
   },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
