
var admin = require("firebase-admin");
var FCM = require("fcm-notification");

var serviceAccount = require("./serviceAccountKey.json");
const certPath = admin.credential.cert(serviceAccount);
var FCMInstance = new FCM(certPath);

// Function to send a notification
function sendNotification(title, message, token, res) {
    let notification = {
        notification: {
            title: title,
            body: message
        },
        data: {
            orderId: "123456",
            orderDate: "2023-10-18"
        },
        token: token
    };

    FCMInstance.send(notification, function (err, response) {
        if (err) {
            console.error("Error sending notification:", err);
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: "Notification sent successfully"
            });
        }
    });
}

exports.Notification = (req, res, next) => {
    try {
        sendNotification("Test Notification", "Notification Message", req.body.fcm_token, res);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Server error"
        });
    }
};

exports.sendNotification = async (req, res) => {
    try {
        const { notificationTitle, notificationMessage, token } = req.body;
        sendNotification(notificationTitle, notificationMessage, token, res);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Server error"
        });
    }
};