const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    prodName: {
      type: String,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    description: {
      type: String,
    },
    images: [{ url: String, asset_id: String, public_id: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
