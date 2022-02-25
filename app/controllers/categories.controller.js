const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// const { categories } = require("../models");
const db = require("../models");
const Categories = db.categories;

exports.addCategory = (req, res) => {
    const category = new Categories({
        coverPic: req.body.coverPic,
        description: req.body.description,
        icon: req.body.icon,
        name: req.body.name,
    });

    category.save((err, category) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        res.json({
            message: "Category was created successfully!",
            data: category,
        });
    });
};

exports.getCategories = (req, res) => {
    Categories.find({}, (err, categories) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        res.json(categories);
    });
};
