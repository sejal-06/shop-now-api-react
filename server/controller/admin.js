const { validationResult } = require("express-validator/check");

const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");

require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "shop-now-be2a5",
  keyFilename: "../server/services/myPrivateKey.json",
});

const bucket = storage.bucket("gs://shop-now-be2a5.appspot.com");

exports.adminProducts = async (req, res, next) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" });
    }
    const products = await Product.find({ userId: id });
    //   console.log(products);
    // if (!products.length) {
    //   return res.status(404).json({ status: false, error: "No products yet" });
    // }
    return res.status(200).json({ status: true, products: products });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Something went wrong" });
  }
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        errors: errors.array()[0].msg,
      });
    }
    console.log(req);
    if (!req.file) {
      return res.status(404).json({ status: false, error: "image not found" });
    }

    const blob = bucket.file(`${Date.now()}-${req.file.originalname}`); //(binary large object) is datatype which stores binary data in database

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => next(err));
    // If all is good and done
    blobStream.on("finish", async () => {
      // Assemble the file public URL
      var publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      console.log(publicUrl);
      const admin = await User.findOne({ _id: req.userId });
      if (!admin) {
        return res.status(404).json({ status: false, error: "user not found" });
      }

      const product = new Product({
        userId: req.userId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: publicUrl,
        category: req.body.category,
        gender: req.body.gender,
        color: req.body.color,
        companyName: req.body.companyName,
      });

      const item = await product.save();
      return res.status(200).json({ status: true, product: item });
    });
    blobStream.end(req.file.buffer);
    // When there is no more data to be consumed from the stream the end event gets emitted
  } catch (error) {
    return res.status(404).json({ status: false, error: "product not saved" });
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    var id = req.userId;
    var productId = req.params.productId;
    const admin = await User.findOne({ _id: id });
    if (!admin) {
      return res.status(404).json({ status: false, error: "user not found" });
    }

    const product = await Product.findOne({ userId: id, _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "product not found of this user" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        errors: errors.array()[0].msg,
      });
    }
    // console.log(req);
    if (!req.file) {
      return res.status(404).json({ status: false, error: "image not found" });
    }

    const blob = bucket.file(`${Date.now()}-${req.file.originalname}`); //(binary large object) is datatype which stores binary data in database

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => next(err));
    // If all is good and done
    blobStream.on("finish", async () => {
      // Assemble the file public URL
      var publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
            userId: req.userId,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: publicUrl,
            category: req.body.category,
            gender: req.body.gender,
            color: req.body.color,
          },
        },
        { new: true }
      );
      console.log(product);
      return res.status(200).json({ status: true, product: product });
    });
    blobStream.end(req.file.buffer);
    // When there is no more data to be consumed from the stream the end event gets emitted
  } catch (error) {
    return res.status(404).json({ status: false, error: "product not edited" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.userId;
    const productId = req.params.productId;

    const admin = await User.findOne({ _id: id });
    if (!admin) {
      return res.status(404).json({ status: false, error: "User not found" });
    }
    const product = await Product.findOne({ _id: productId, userId: id });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "Product not of this user" });
    }
    await Product.deleteOne({ _id: productId, userId: id });

    //remove from cart and wishlist as well
    const users = await User.find();
    for (var i = 0; i < users.length; i++) {
      var productindex = -1;
      users[i].cart.forEach((item, index) => {
        if (item.productId == productId) {
          productindex = index;
        }
      });

      if (productindex != -1) {
        var newcart = users[i].cart.filter((item, index) => {
          return index !== productindex;
        });
        const newuser = await User.findOneAndUpdate(
          { _id: users[i]._id },
          { cart: newcart },
          { new: true }
        );
      }

      var productindex = -1;
      users[i].wishlist.forEach((item, index) => {
        if (item.productId == productId) {
          productindex = index;
        }
      });

      if (productindex != -1) {
        var newwishlist = users[i].wishlist.filter((item, index) => {
          return index !== productindex;
        });
        const newuser = await User.findOneAndUpdate(
          { _id: users[i]._id },
          { wishlist: newwishlist },
          { new: true }
        );
      }
    }

    return res.status(200).json({ status: true, msg: "Product deleted" });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Product not deleted" });
  }
};
