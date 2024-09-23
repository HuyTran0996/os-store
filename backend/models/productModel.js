const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [{ url: String, asset_id: String, public_id: String }],
    color: [
      {
        name: { type: String, lowercase: true },
        colorCode: String,
        image: [{ url: String, asset_id: String, public_id: String }],
      },
    ],
    size: [
      {
        name: { type: String, lowercase: true },
        image: [{ url: String, asset_id: String, public_id: String }],
      },
    ],
    variant: [
      {
        name: { type: String, lowercase: true },
        image: [{ url: String, asset_id: String, public_id: String }],
      },
    ],
    // variant: [
    //   {
    //     tag: {
    //       type: String,
    //       enum: ["color", "size", "version"],
    //     },
    //     name: { type: String, lowercase: true },
    //     colorCode: String,
    //     image: String,
    //   },
    // ],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.ratings && this.ratings.length > 0) {
    const totalStars = this.ratings.reduce((prev, curr) => prev + curr.star, 0);

    this.totalrating = (totalStars / this.ratings.length).toFixed(2);
  } else {
    this.totalrating = 0;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
