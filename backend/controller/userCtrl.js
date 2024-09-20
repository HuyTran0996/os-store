const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const APIFeatures = require("../utils/apiFeatures");
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
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(User.countDocuments(), req.query).filter();

  const users = await features.query;
  const totalUser = await total.query;

  res.status(200).json({
    status: "success",
    data: { total: totalUser.length, users },
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

  const roleUser = await User.findById(id);
  if (req.user.role === "admin" && roleUser.role === "manager")
    throw new AppError("Admins cannot block managers.", 403);

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

  const roleUser = await User.findById(id);
  if (req.user.role === "admin" && roleUser.role === "manager")
    throw new AppError("Admins cannot unblock managers.", 403);

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

exports.userProductOrderCompare = asyncHandler(async (req, res) => {
  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const usersFromThisMonth = await User.countDocuments({
    createdAt: { $gte: startOfCurrentMonth },
  });
  const usersFromLastMonth = await User.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
  });

  const productsFromThisMonth = await Product.countDocuments({
    createdAt: { $gte: startOfCurrentMonth },
  });
  const productsFromLastMonth = await Product.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
  });

  const ordersFromThisMonth = await Order.countDocuments({
    createdAt: { $gte: startOfCurrentMonth },
  });
  const ordersFromLastMonth = await Order.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
  });

  const totalUser = await User.countDocuments();
  const totalProduct = await Product.countDocuments();
  const totalOrder = await Order.countDocuments();

  res.status(200).json({
    status: "success",
    data: [
      {
        title: "User",
        thisMonth: usersFromThisMonth,
        lastMonth: usersFromLastMonth,
        total: totalUser,
      },
      {
        title: "Product",
        thisMonth: productsFromThisMonth,
        lastMonth: productsFromLastMonth,
        total: totalProduct,
      },
      {
        title: "Order",
        thisMonth: ordersFromThisMonth,
        lastMonth: ordersFromLastMonth,
        total: totalOrder,
      },
    ],
  });
});
