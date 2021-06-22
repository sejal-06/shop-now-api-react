const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const path = require("path");
const shopnowlogo = path.join(__dirname, "../", "shopnow-logo.png");

exports.changepass = async (req, res, next) => {
  try {
    const resettoken = req.params.resettoken;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        error: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({
      resetToken: resettoken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, error: "Reset link has been expired" });
    }
    const newpass = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { resetToken: resettoken },
      { password: newpass },
      { new: true }
    );

    return res
      .status(200)
      .json({ status: true, msg: "Password changed successfully!!" });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "Something wrong try again!!" });
  }
};

exports.resetmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        error: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, error: "This email is not registered!" });
    }

    const randombuffer = await crypto.randomBytes(32);
    const resettoken = randombuffer.toString("hex");

    const newuser = await User.findOneAndUpdate(
      { email: email },
      {
        resetToken: resettoken,
        resetTokenExpiration: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log(newuser.resetToken);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shopnow1065@gmail.com",
        pass: "shopnow@123",
      },
    });
    let info = await transporter.sendMail({
      to: email,
      from: "shopnow1065@gmail.com",
      fromname: "shopnow",
      subject: "Password reset",
      html: `<body>
          <div style='color:black ;width: 70% ; margin:auto;'>
              <div style="left:0%;display: flex;border-bottom: 1px solid rgb(115, 121, 121);">
                  <img src="https://previews.123rf.com/images/makkuro/makkuro1510/makkuro151000145/47163781-sale-colorful-shopping-cart-with-bags-isolated-on-white-background.jpg"
                      width=15% height=15% alt="">
                  <div style="margin:5% 20%;color:black;font-size: 250%;font-weight: 600;"><i>Shopnow</i></div>
      
              </div>
      
              <h2 style="color:rgb(39, 49, 51)">FORGOT YOUR PASSWORD?</h2>
              <!-- <p style="margin-top: -1%;margin-bottom: -1%;font-size: 175%;">No worries</p> -->
              <p style="font-size: 150%;margin-left: 2.5%;color:black">Dear Customer,<br>We received a request to reset the password for
                  your account. If you made this request, please click the following reset button to change
                  <i>shopnow</i> password
              </p>
              <button
                  style="margin-left:35%;padding: 0.5rem 1rem;border-radius: 5px;margin-bottom: 3%;background-color: teal;"><a
                      href="http://localhost:3000/confirmreset/${resettoken}"
                      style="text-decoration: none;color:white;font-size: 150%;font-style: inherit;font-weight: 600;">Reset Password</a></button>
      
              <h4 style="margin-left:5px">This reset is valid for once within <em>1 hour</em> !</h4>
          </div>
      </body>
          `,
    });

    return res.status(200).json({ status: true, msg: "Reset mail sent!!" });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: false, error: "something wrong try again!!" });
  }
};

exports.isauth = async (req, res, next) => {
  try {
    return res.status(200).json({ status: true, Authentication: true });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: false, Authentication: false });
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    var user = await User.findOne({ username: username });

    if (user) {
      return res.status(404).json({
        status: false,
        param: "username",
        error: "This username already exist",
      });
    }

    user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({
        status: false,
        param: "email",
        error: "This email already exist",
      });
    }

    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        error: errors.array()[0].msg,
      });
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

    let transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "shopnow1065@gmail.com",
        pass: "shopnow@123",
      },
    });
    // console.log(shopnowlogo);
    let info = await transporter.sendMail({
      from: "shopnow1065@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Signup Successful ✔", // Subject line
      html: `<body>
      <div style='color:black ;width: 70% ; margin:auto;'>
          <div style="left:0%;display: flex;border-bottom: 1px solid rgb(115, 121, 121);">
              <img src="https://previews.123rf.com/images/makkuro/makkuro1510/makkuro151000145/47163781-sale-colorful-shopping-cart-with-bags-isolated-on-white-background.jpg"
                  width=15% height=15% alt="">
              <div style="margin:5% 20%;font-size: 250%;font-weight: 600"><i>Shopnow</i></div>
  
          </div>
  
          <h3 style="color:rgb(39, 49, 51)">You successfully signed up!!</h3>
          <h4 style="color:rgb(39, 49, 51)">Welcome to the new world of shopping with fast service and great experience</h4>
          
  
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
  try {
    var email = req.body.email;
    var password = req.body.password;
    // console.log(req.body.email);

    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(404).json({
        status: false,
        param: errors.array()[0].param,
        error: errors.array()[0].msg,
      });
    }

    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: false,
        error: "Enter valid credentials",
      });
    }
    var domatch = await bcrypt.compare(password, user.password);

    if (!domatch) {
      return res.status(404).json({
        status: false,
        error: "Enter valid credentials",
      });
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
      },
      "somesupersupersecret",
      { expiresIn: "2h" }
    );

    return res
      .status(200)
      .json({ status: true, token: token, userId: user._id });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ status: false, error: "Authentication failed!" });
  }
};
