const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const admin = require("firebase-admin");

exports.sliders = (req, res) => {
    res.json([
        {
            imageURL: "https://chaahiyo.com/appBanner/2.jpg",
            title: "First Banner",
            link: "https://santoshsah.com.np/chahiyo/chahiyo_banner1.jpg",
            desc: "This is a test desscription",
        },
        {
            imageURL: "https://chaahiyo.com/appBanner/3.jpg",
            title: "First Banner",
            link: "https://santoshsah.com.np/chahiyo/chahiyo_banner1.jpg",
            desc: "This is a test desscription",
        },
        {
            imageURL: "https://chaahiyo.com/appBanner/4.jpg",
            title: "First Banner",
            link: "https://santoshsah.com.np/chahiyo/chahiyo_banner1.jpg",
            desc: "This is a test desscription",
        },
        {
            imageURL: "https://chaahiyo.com/appBanner/5.jpg",
            title: "First Banner",
            link: "https://santoshsah.com.np/chahiyo/chahiyo_banner1.jpg",
            desc: "This is a test desscription",
        },
    ]);
};

exports.allAccess = (req, res) => {
    res.status(200).send("Chaahiyo Admin");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content. Coming Soon");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.userList = (req, res) => {
    User.find().then(user, () => {
        res.json(user);
    });
};

exports.dashboard = (req, res) => {
    res.status(200).send("User Profile");
};

// exports.sendNotification = (req, res) => {
//     const message = req.body.message;
//     const from = req.body.from;
//     const to = req.body.deviceToken;

//     console.log("=> Message from App : ", message);
//     console.log("=> Device Token :", to);
//     console.log("=> From user :", from);

//     var options = {
//         priority: "high",
//     };

//     const payload = {
//         notification: {
//             title: req.from + " sent a message",
//             body: req.message,
//             icon: "default",
//             sound: "default",
//             vibrate: "true",
//             android_channel_id: "1",
//         },
//     };

//     admin
//         .messaging()
//         .sendToDevice(to, payload, options)
//         .then((response) => {
//             console.log("Successfully sent message: ", response);
//             return true;
//         })
//         .catch((error) => {
//             console.log("Error sending message: ", error);
//             return false;
//         });
// };

exports.sendNotification = (req, res) => {
    console.log("Notification body", req.body);
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24,
    };

    const from = req.body.from;
    const toToken = req.body.deviceToken;
    const message = req.body.message;
    const options = notification_options;

    const payload = {
        notification: {
            title: from + " sent you a message",
            body: message,
            icon: "default",
            sound: "default",
            vibrate: "true",
            android_channel_id: "1",
        },
    };

    console.log("=> Message : ", message);
    console.log("=> Device Token :", toToken);

    admin
        .messaging()
        .sendToDevice(toToken, payload, options)
        .then((response) => {
            res.status(200).json({ message: "Notification sent successfully" });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.addCreditToUser = (req, res) => {
    const userId = context.auth.uid;
    const creditToAdd = data.credit;

    admin
        .database()
        .ref("users")
        .child(userId)
        .child("credit")
        .set(creditToAdd)
        .then((response) => {
            console.log("Credit Added :", response);
            return true;
        })
        .catch((error) => {
            console.log("Error adding credit", error);
            return false;
        });
};
