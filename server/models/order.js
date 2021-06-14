const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    [{
      productId: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }]
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required:true
  }
});

module.exports = mongoose.model('Order', orderSchema);
