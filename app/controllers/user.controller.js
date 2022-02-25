const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

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
