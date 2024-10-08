const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {
      method: {
        type: String,
        enum: ["COD", "OBT"], //cash on delivery & Online Banking Transfer
        default: "COD",
      },
      amount: Number,
      status: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid",
        currency: "usd",
      },
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Cancelled", "Delivered"],
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderbyEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
