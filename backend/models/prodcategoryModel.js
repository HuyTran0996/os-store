const mongoose = require("mongoose");

const prodcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    images: [{ url: String, asset_id: String, public_id: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PCategory", prodcategorySchema);
