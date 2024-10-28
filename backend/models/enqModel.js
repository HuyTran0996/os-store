const mongoose = require("mongoose");

const enqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Submitted",
      enum: ["Submitted", "Contacted", "Processing", "Resolved"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enqSchema);
