const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const friendRequests = [];
const notifications = [];

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