const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deletedproductsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: [],
  color: {
    type: String,
    required: true,
  },
  type: [],

  companyName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  prodId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Deletedproducts", deletedproductsSchema);
