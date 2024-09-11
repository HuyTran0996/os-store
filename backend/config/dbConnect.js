const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB ");
  } catch (err) {
    console.log("DB connection failed:", err);
  }
};

module.exports = dbConnect;
