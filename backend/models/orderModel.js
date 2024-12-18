const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderCode: String,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
        variantSelected: String,
      },
    ],
    paymentIntent: {
      method: {
        type: String,
        enum: ["COD", "OBT"], //cash on delivery & Online Banking Transfer
        default: "COD",
      },
      subtotal: Number,
      couponName: String,
      discount: Number,
      totalAfterDiscount: Number,
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
    shippingAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
