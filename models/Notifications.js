const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const friendRequests = [];
const notification = [];

app.post('/friend-request', (req, res) => {
  const { senderId, recipientId } = req.body;


  friendRequests.push({ senderId, recipientId });

 
  const notification = {
    recipientId,
    message: `You have a new friend request from user ${senderId}`,
  };
  notifications.push(notification);

  res.status(201).send('Friend request sent.');
});

app.get('/notifications/:userId', (req, res) => {
  const userId = req.params.userId;
  const userNotifications = notifications.filter((n) => n.recipientId === userId);
  res.json(userNotifications);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

///

// const notification   = [];

app.post('/post-notification', (req, res) => {
  const { userId, postId } = req.body;

  const notification = {
    type: 'post',
    userId,
    postId,
    message: 'You have a new post notification.',
  };

  notifications.push(notification);

  res.status(201).send('Post notification sent.');
});


app.post('/like-notification', (req, res) => {
  const { userId, postId } = req.body;

  const notification = {
    type: 'like',
    userId,
    postId,
    message: 'Someone liked your post.',
  };

  notifications.push(notification);

  res.status(201).send('Like notification sent.');
});


app.post('/message-notification', (req, res) => {
  const { userId, senderId, message } = req.body;

  const notification = {
    type: 'message',
    userId,
    senderId,
    message,
  };

  notifications.push(notification);

  res.status(201).send('Message notification sent.');
});
//comment

const notifications = [];

app.post('/comment-notification', (req, res) => {
  const { userId, postId, comment } = req.body;

  const notification = {
    type: 'comment',
    userId,
    postId,
    message: `You received a new comment on your post: ${comment}`,
  };

  notifications.push(notification);

  res.status(201).send('Comment notification sent.');
});


app.get('/comment-notifications/:userId', (req, res) => {
  const userId = req.params.userId;
  const userCommentNotifications = notifications.filter(
    (n) => n.type === 'comment' && n.userId === userId
  );
  res.json(userCommentNotifications);
});
