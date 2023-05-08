const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    items: {
      type: [{ name: String, quantity: Number }],
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    //customer: {
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: 'Customer',
    //  required: true
    //},
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });
  
  const Order = mongoose.model('Order', orderSchema);

module.exports = Order;