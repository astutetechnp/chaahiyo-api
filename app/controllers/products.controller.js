const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
var ObjectId = require("mongodb").ObjectID;
// const { categories } = require("../models");
const db = require("../models");
const Products = db.products;
const Categories = db.categories;

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

exports.uploadImage = async (req, res, next) => {
    const { filename: image } = req.file;

    await sharp(req.file.path)
        .resize({ height: 400 })
        .jpeg({ quality: 90 })
        .toFile(path.resolve(req.file.destination, "products", image));
    fs.unlinkSync(req.file.path);

    console.log(req.file);
    res.json({ imageURL: "products/" + req.file.path });
};

exports.uploadImages = async (req, res) => {
    if (req.body.images.length <= 0) {
        return res.send(`You must select at least 1 image.`);
    }
    const images = req.body.images.map((image) => "" + image + "").join("");
    return res.send(`Images were uploaded:${images}`);
};

exports.addProduct = async (req, res) => {
    const { filename: image } = req.file;

    await sharp(req.file.path)
        .resize({ height: 400 })
        .jpeg({ quality: 90 })
        .toFile(path.resolve(req.file.destination, "products", image));
    fs.unlinkSync(req.file.path);

    const product = new Products({
        user_id: req.body.user_id,
        name: req.body.name,
        image_url: image,
        price: req.body.price,
        desc: req.body.desc,
        city: req.body.city,
        category: req.body.category,
        views: req.body.views,
        taking_to: req.body.talking_to,
        chat: req.body.chat,
        call: req.body.call,
        lat: req.body.lat,
        lng: req.body.lng,
        hash: req.body.hash,
        location: {
            type: "Point",
            coordinates: [req.body.lat, req.body.lng],
        },
    });

    console.log("ProductObj", product);

    product.save((err, product) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        Products.populate(product, {
            path: "category",
            select: { name: 1 },
        }).then((newProduct) => {
            res.json({
                message: "Product was created successfully!",
                data: newProduct,
            });
        });
    });
};

exports.getProductsNearBy = (req, res) => {
    Products.aggregate(
        [
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [
                            parseFloat(req.body.lat),
                            parseFloat(req.body.lng),
                        ],
                    },
                    distanceField: "distance",
                    distanceMultiplier: 1 / 6371,
                    maxDistance: 2000,
                    spherical: true,
                },
            },
            {
                $sort: { distance: -1 }, // Sort the nearest first
            },
        ],
        function (err, docs) {
            res.json(docs);
        }
    );
};

exports.getProducts = (req, res) => {
    Products.find({})
        .populate("category", "name")
        .exec((err, products) => {
            if (err) {
                res.status(500).json({ message: err });
                return;
            }
            res.json(products);
        });
};

exports.getExpiringProducts = (req, res) => {
    Products.find({})
        .sort({ unixTS: 1 })
        .populate("category", "name")
        .exec((err, products) => {
            if (err) {
                res.status(500).json({ message: err });
                return;
            }
            res.json(products);
        });
};

exports.getProductsByCategory = (req, res) => {
    let category_id = req.query.category_id;
    Products.find({ category: new ObjectId(category_id) })
        .populate("category", "name")
        .exec((err, products) => {
            if (err) {
                res.status(500).json({ message: err });
                return;
            }
            res.json(products);
        });
};

exports.getLatestProducts = (req, res) => {
    Products.find({})
        .sort({ createdAt: -1 })
        .populate("category", "name")
        .exec((err, products) => {
            if (err) {
                res.status(500).json({ message: err });
                return;
            }

            res.json(products);
        });
};
