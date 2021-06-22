const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);

const MONGODB_URI = `mongodb+srv://Sejal:mongodb123@cluster0.lxs3r.mongodb.net/shop`;

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
