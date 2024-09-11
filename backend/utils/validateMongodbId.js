const mongoose = require("mongoose");
const AppError = require("./appError");

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new AppError("This id is not valid or not found", 404);
};

module.exports = validateMongodbId;
