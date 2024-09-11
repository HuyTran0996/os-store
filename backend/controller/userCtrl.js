const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateToken, cookieOption } = require("../config/jwtToken");

exports.updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, phone } = req.body;

  if (!name && !phone)
    throw new AppError("Please provide all information", 400);

  const updateUser = await User.findByIdAndUpdate(
    _id,
    { name, phone },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    updateUser,
  });
});

exports.saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  validateMongodbId(_id);

  if (!address) throw new AppError("Please provide address", 400);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      address,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

exports.getAllUser = asyncHandler(async (req, res) => {
  const getUsers = await User.find();
  res.status(200).json({
    status: "success",
    getUsers,
  });
});

exports.getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const getUser = await User.findById(id);
  if (!getUser) throw new AppError("User is not found", 404);
  res.status(200).json({
    status: "success",
    getUser,
  });
});

exports.deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  await User.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
  });
});

exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const blockUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  res.status(204).json({
    status: "success",
    blockUser,
  });
});

exports.unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const unblockUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  res.status(204).json({
    status: "success",
    unblockUser,
  });
});

exports.getWishlist = asyncHandler(async (req, res) => {
  const findUser = await User.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    status: "success",
    wishlist: findUser.wishlist,
  });
});
