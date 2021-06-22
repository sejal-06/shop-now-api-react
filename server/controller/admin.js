const { validationResult } = require("express-validator/check");

const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const Deletedproducts = require("../models/deletedproducts");

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
        error: errors.array()[0].msg,
      });
    }

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

      const admin = await User.findOne({ _id: req.userId });
      if (!admin) {
        return res.status(404).json({ status: false, error: "user not found" });
      }

      var categoryarr = req.body.category;
      var newcatarr = [];
      if (categoryarr) {
        newcatarr = categoryarr.split(",");
      }
      var typearr = req.body.type;
      var newtypearr = [];
      if (typearr) {
        newtypearr = typearr.split(",");
      }

      const product = new Product({
        userId: req.userId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: publicUrl,
        category: newcatarr,
        type: newtypearr,
        color: req.body.color,
        companyName: req.body.companyName,
      });

      const item = await product.save();
      return res.status(200).json({ status: true, product: item });
    });
    blobStream.end(req.file.buffer);
    // When there is no more data to be consumed from the stream the end event gets emitted
  } catch (error) {
    console.log(error);
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
        error: errors.array()[0].msg,
      });
    }

    // if (!req.file) {
    //   return res.status(404).json({ status: false, error: "image not found" });
    // }
    var categoryarr = req.body.category;
    var newcatarr = [];
    if (categoryarr) {
      newcatarr = categoryarr.split(",");
    }
    var typearr = req.body.type;
    var newtypearr = [];
    if (typearr) {
      newtypearr = typearr.split(",");
    }
    if (!req.file) {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
            userId: req.userId,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            // imageUrl: publicUrl,
            category: newcatarr,
            type: newtypearr,
            gender: req.body.gender,
            color: req.body.color,
            companyName: req.body.companyName,
          },
        },
        { new: true }
      );
      return res.status(200).json({ status: true, product: product });
    }

    if (
      !(
        req.file.mimetype == "image/png" ||
        req.file.mimetype == "image/jpeg" ||
        req.file.mimetype == "image/jpg" ||
        req.file.mimetype == "image/gif"
      )
    ) {
      return res
        .status(404)
        .json({ status: false, error: "File type not supported" });
    }

    const blob = bucket.file(`${Date.now()}-${req.file.originalname}`); //(binary large object) is datatype which stores binary data in database

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => next(err));

    blobStream.on("finish", async () => {
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
            category: newcatarr,
            type: newtypearr,
            gender: req.body.gender,
            color: req.body.color,
            companyName: req.body.companyName,
          },
        },
        { new: true }
      );

      return res.status(200).json({ status: true, product: product });
    });
    blobStream.end(req.file.buffer);
    // When there is no more data to be consumed from the stream the end event gets emitted
  } catch (error) {
    console.log(error);
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

    const deleted = new Deletedproducts({
      prodId: product._id,
      userId: product.userId,
      title: product.title,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      type: product.type,
      color: product.color,
      companyName: product.companyName,
    });
    await deleted.save();
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
          { wishlist: newwishlist, cart: newcart },
          { new: true }
        );
      }
    }

    return res.status(200).json({ status: true, msg: "Product deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product not deleted" });
  }
};

exports.deletedproduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Deletedproducts.findOne({ prodId: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "Product not found" });
    }
    return res.status(200).json({ status: true, product: product });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product fetch failed" });
  }
};
