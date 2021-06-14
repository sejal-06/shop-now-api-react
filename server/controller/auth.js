const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");

exports.postSignup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        errors: errors.array()[0].msg,
      });
    }
    var user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(404)
        .json({ status: false, error: "This email already exist" });
    }
    user = await User.findOne({ username: username });

    if (user) {
      return res
        .status(404)
        .json({ status: false, error: "This username already exist" });
    }

    var hashedpassword = await bcrypt.hash(password, 12);
    user = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedpassword,
    });
    await user.save();

    //sending mail
    let transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "ecommerce.shopnow2611@gmail.com",
        pass: "shopnow@123",
      },
    });

    let info = await transporter.sendMail({
      from: "ecommerce.shopnow2611@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Signup Successful ✔", // Subject line
      html: `<body>
        <div style='color:black ;width: 40vw ; margin:auto;'>
            <div style="left:0%;display: flex;border-bottom: 1px solid rgb(115, 121, 121);">
                <img src="https://previews.123rf.com/images/makkuro/makkuro1510/makkuro151000145/47163781-sale-colorful-shopping-cart-with-bags-isolated-on-white-background.jpg"
                    width=15% height=15% alt="">
                <div style="margin:5% 20%;font-size: 250%;font-weight: 1000"><i>Shopnow</i></div>
    
            </div>
    
            <h2 style="color:rgb(39, 49, 51)">You successfully signed up!!</h2>
            <h3 style="color:rgb(39, 49, 51)">Welcome to the new world of shopping with fast service and great experience</h3>
            
    
        </div>
    </body>
        `,
    });

    return res.status(200).json({ status: true, user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "user data not saved" });
  }
};

exports.postLogin = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  // console.log(req.body.email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      param: errors.array()[0].param,
      errors: errors.array()[0].msg,
    });
  }

  var user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: false,
      error: "Invalid email or password",
    });
  }
  var domatch = await bcrypt.compare(password, user.password);

  if (!domatch) {
    return res.status(404).json({
      status: false,
      error: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      email: email,
      userId: user._id,
    },
    "somesupersupersecret",
    { expiresIn: "12h" }
  );

  return res.status(200).json({ token: token, userId: user._id });
};
