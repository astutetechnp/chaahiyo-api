const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        coverPic: String,
        description: String,
        icon: String,
        name: String,
    })
);

module.exports = Categories;
