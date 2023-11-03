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

///Follow Notifications: Notify users when someone starts following them or when someone they follow posts new content.
// app.post('/follow-notification', (req, res) => {
//   const { userId, followerId } = req.body;

//   const notification = {
//     type: 'follow',
//     userId,
//     followerId,
//     message: 'You have a new follower.',
//   };

//   notifications.push(notification);

//   res.status(201).send('Follow notification sent.');
// });


// Mention Notifications: Notify users when they are mentioned by another user in a comment, post, or message.
app.post('/mention-notification', (req, res) => {
  const { userId, mentionedBy, contentId, contentType } = req.body;

  const notification = {
    type: 'mention',
    userId,
    mentionedBy,
    contentId,
    contentType,
    message: 'You were mentioned in a post/comment.',
  };

  notifications.push(notification);

  res.status(201).send('Mention notification sent.');
});

//Tag Notifications: Notify users when they are tagged in a post or a photo.

app.post('/tag-notification', (req, res) => {
  const { userId, taggedBy, postId } = req.body;

  const notification = {
    type: 'tag',
    userId,
    taggedBy,
    postId,
    message: 'You were tagged in a post/photo.',
  };

  notifications.push(notification);

  res.status(201).send('Tag notification sent.');
});

//User Engagement Notifications: Notify users about activity on their content, such as when someone shares, reblogs, or reshare their posts.

app.post('/engagement-notification', (req, res) => {
  const { userId, actionUserId, postId, action } = req.body;

  const notification = {
    type: 'engagement',
    userId,
    actionUserId,
    postId,
    message: `Your post was ${action} by ${actionUserId}.`,
  };

  notifications.push(notification);

  res.status(201).send('Engagement notification sent.');
});
