const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const { compareSync } = require("bcryptjs");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51HzJtED3YnSFKpD5mC7LwRXYNYoNaj0h9qQ6r3mqDCOj6BKnVSW7tfwvtwOvoXjT2DaiuECI4gBomVibGh8JZuYo00Ao6JXsmU"
);

exports.productsafterpagination = async (req, res, next) => {
  try {
    const pagenumber = parseInt(req.params.pageno);
    const numberofprod = await Product.find().countDocuments();

    if (pagenumber <= 0 || Math.ceil(numberofprod / 12) < pagenumber) {
      return res
        .status(404)
        .json({ status: false, error: "Invalid page number" });
    }
    const products = await Product.find()
      .skip((pagenumber - 1) * 12)
      .limit(12);

    return res.status(200).json({ status: true, products: products });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Something went wrong" });
  }
};

exports.countofallproducts = async (req, res, next) => {
  try {
    const count = await Product.find().countDocuments();
    return res.status(200).json({ status: true, count: count });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Something went wrong" });
  }
};

exports.allproducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ status: true, products: products });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Something went wrong" });
  }
};

exports.allproductsbycategory = async (req, res, next) => {
  try {
    const category = req.params.category.toLowerCase();

    const products = await Product.find({
      $or: [{ type: category }, { category: category }],
    });

    return res.status(200).json({ status: true, products: products });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Something went wrong" });
  }
};

exports.addtocart = async (req, res, next) => {
  try {
    const id = req.userId;
    const productId = req.params.productId;
    var quantity = req.params.quantity;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "product not found" });
    }

    var productindex = -1;
    user.cart.forEach((item, index) => {
      if (item.productId == productId) {
        productindex = index;
      }
    });
    // console.log(productindex);
    quantity = Math.max(1, quantity);
    if (productindex == -1) {
      user.cart.push({ productId: productId, quantity: +quantity });
    } else {
      user.cart[productindex].quantity += +quantity;
    }
    // console.log(user.cart);
    const newuser = await User.findOneAndUpdate(
      { _id: id },
      {
        cart: user.cart,
      },
      { new: true }
    );
    return res.status(404).json({ status: true, user: newuser });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product not added to cart" });
  }
};
exports.addtowishlist = async (req, res, next) => {
  try {
    const id = req.userId;
    const productId = req.params.productId;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json({ status: false, error: "product not found" });
    }

    var productindex = -1;
    user.wishlist.forEach((item, index) => {
      if (item.productId == productId) {
        productindex = index;
      }
    });
    if (productindex != -1) {
      return res
        .status(200)
        .json({ status: true, msg: "item already in wishlist" });
    }

    user.wishlist.push({ productId: productId });
    const newuser = await User.findOneAndUpdate(
      { _id: id },
      {
        wishlist: user.wishlist,
      },
      { new: true }
    );

    return res.status(200).json({ status: true, user: newuser });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Product not added to wishlist" });
  }
};
exports.allproductsofwishlist = async (req, res, next) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    // if (!user.wishlist.length) {
    //   return res
    //     .status(200)
    //     .json({ status: false, msg: "no item in wishlist" });
    // }
    return res.status(200).json({ status: true, wishlist: user.wishlist });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Fetching wishlist products failed" });
  }
};

exports.allproductsofcart = async (req, res, next) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    // if (!user.cart.length) {
    //   return res.status(200).json({ status: false, msg: "no item in cart" });
    // }
    return res.status(200).json({ status: true, cart: user.cart });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Fetching cart products failed" });
  }
};

exports.product = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ status: false, msg: "product not found" });
    }
    return res.status(200).json({ status: true, product: product });
  } catch (err) {
    return res
      .status(404)
      .json({ status: false, error: "Fetching product failed" });
  }
};
exports.deletefromcart = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }

    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ status: false, msg: "product not found" });
    }

    var productindex = -1;
    user.cart.forEach((item, index) => {
      if (item.productId == productId) {
        productindex = index;
      }
    });

    if (productindex == -1) {
      return res
        .status(404)
        .json({ status: false, error: "This item is not in cart!" });
    }

    var newcart = user.cart.filter((item, index) => {
      return index !== productindex;
    });
    const newuser = await User.findOneAndUpdate(
      { _id: id },
      { cart: newcart },
      { new: true }
    );
    return res.status(200).json({ status: true, user: newuser });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product not added to cart" });
  }
};

exports.changequantityofcartto = async (req, res, next) => {
  try {
    const id = req.userId;
    var user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }

    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ status: false, msg: "product not found" });
    }

    var productindex = -1;
    user.cart.forEach((item, index) => {
      if (item.productId == productId) {
        productindex = index;
      }
    });

    if (productindex == -1) {
      return res
        .status(404)
        .json({ status: false, error: "This item is not in cart!" });
    }
    const count = Math.max(req.params.count, 1);
    user.cart[productindex].quantity = count;

    const newuser = await User.findOneAndUpdate(
      { _id: id },
      { cart: user.cart },
      { new: true }
    );

    return res.status(200).json({ status: true, user: newuser });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product not added to cart" });
  }
};

exports.deletefromwishlist = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }

    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ status: false, msg: "product not found" });
    }

    var productindex = -1;
    user.wishlist.forEach((item, index) => {
      if (item.productId == productId) {
        productindex = index;
      }
    });

    if (productindex == -1) {
      return res
        .status(404)
        .json({ status: false, error: "This item is not in wishlist!" });
    }

    var newwishlist = user.wishlist.filter((item, index) => {
      return index !== productindex;
    });
    const newuser = await User.findOneAndUpdate(
      { _id: id },
      { wishlist: newwishlist },
      { new: true }
    );
    return res.status(200).json({ status: true, user: newuser });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Product not added to wishlist" });
  }
};
exports.placeorder = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    if (user.cart.length == 0) {
      // console.log("inside this");
      return res.status(404).json({ status: false, error: "no item to order" });
    }
    const orders = [];
    user.cart.forEach((pro) => {
      orders.push(pro._doc);
    });

    var momentdate = moment().format("MMMM Do YYYY, h:mm:ss a");

    orders.push({ orderdate: momentdate });
    var userinorders = await Order.findOne({ userId: id });

    if (!userinorders) {
      const neworder = new Order({
        userId: id,
        products: [orders],
      });
      await neworder.save();
      return res.status(200).json({ status: true, order: neworder });
    }

    userinorders.products.unshift(orders);

    const or = await Order.findOneAndUpdate(
      { userId: id },
      { products: userinorders.products },
      { new: true }
    );

    const token = req.body.stripeToken;
    const amount = req.body.amount;
    // console.log(token);
    await stripe.charges.create({
      amount: amount,
      currency: "inr",
      source: token,
      // description: `Payment for ${product.title}`,
      // metadata: {
      //   order: ordersarr,
      // },
    });
    //remove elements from cart
    await User.findOneAndUpdate({ _id: id }, { cart: [] });

    return res.status(200).json({ status: true, order: or });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, error: "Order not placed" });
  }
};
exports.allorders = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    const order = await Order.findOne({ userId: id });
    if (!order) {
      return res.status(200).json({ status: true, msg: "no orders yet" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "order fetched", orders: order.products });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, error: "Order not placed" });
  }
};

exports.order = async (req, res, next) => {
  try {
    const index = req.params.index;
    const id = req.userId;
    const order = await Order.findOne({ userId: id });
    if (!order) {
      return res.status(404).json({ status: false, error: "not found" });
    }
    if (index < 0 || index >= order.products.length) {
      return res.status(404).json({ status: false, error: "invalid order" });
    }

    return res.status(200).json({ status: true, order: order.products[index] });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, error: "not found" });
  }
};

exports.getinvoice = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, error: "user not found" });
    }
    const productId = req.params.productId;
    const order = await Order.findOne({ userId: id });
    if (!order) {
      return res.status(404).json({ status: false, error: "no orders" });
    }

    var orderindex = -1;
    // order.products.forEach((item, index) => {
    //   if (item.productId == productId) {
    //     orderindex = index;
    //   }
    // });
    // if (orderindex == -1) {
    //   return res
    //     .status(404)
    //     .json({ status: false, error: "you never ordered this item" });
    // }
    // return res
    //   .status(200)
    //   .json({ status: true, order: order.products[orderindex] });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, error: "Order not placed" });
  }
};
