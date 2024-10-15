const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Brand = require("../models/brandModel");
const ProdCategory = require("../models/prodcategoryModel");
const Coupon = require("../models/couponModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");
const { generateToken, cookieOption } = require("../config/jwtToken");

exports.updatedUser = (action) =>
  asyncHandler(async (req, res) => {
    if (action === "self") {
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
    } else if (action === "admin") {
      const { id, name, phone } = req.body;

      validateMongodbId(id);
      if (!id && !name && !phone)
        throw new AppError("Please provide all information", 400);

      const roleUser = await User.findById(id);
      if (!roleUser) throw new AppError("User not found", 404);
      if (req.user.role === "admin" && roleUser.role === "manager")
        throw new AppError("Admins can't change managers.", 403);

      const updateUser = await User.findByIdAndUpdate(
        id,
        { name, phone },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        updateUser,
      });
    }
  });

exports.changeRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) throw new AppError("Please provide id and role", 400);
  if (role !== "user" && role !== "admin" && role !== "manager")
    throw new AppError("Invalid role", 400);
  if (req.user.role === "admin" && role === "manager")
    throw new AppError("Admins can't change users to managers.", 403);

  validateMongodbId(userId);

  const userRole = await User.findById(userId);
  if (!userRole) throw new AppError("User not found", 404);
  if (req.user.role === "admin" && userRole.role === "manager")
    throw new AppError("Admins can't change managers.", 403);

  const updateUser = await User.findByIdAndUpdate(
    userId,
    { role },
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

exports.blockUser = (action) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    if (action === "admin") {
      const roleUser = await User.findById(id);
      if (req.user.role === "admin" && roleUser.role === "manager")
        throw new AppError("Admins cannot block managers.", 403);
    }
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

exports.smartUserSearch = (action) =>
  asyncHandler(async (req, res) => {
    const { searchField } = req.body;
    const { filter } = req.query;
    if (!searchField) throw new AppError("Please provide search text", 400);
    let model;
    let field;
    let searchArea = [];
    let filedToShow = {};
    let searchAreaForArrayFields = [];
    let additionalMatch = {};
    if (action === "user") {
      model = User;
      field = "users";
      searchArea = ["phone", "name", "email", "role"];
      filedToShow = {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        role: 1,
        isBlocked: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };
    }

    if (action === "brand") {
      model = Brand;
      field = "brands";
      searchArea = ["title"];
      filedToShow = {
        _id: 1,
        title: 1,
        images: 1,
        tag: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };
    }
    if (action === "prodCategory") {
      model = ProdCategory;
      field = "categories";
      searchArea = ["title"];
      filedToShow = {
        _id: 1,
        title: 1,
        images: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };
    }

    if (action === "product") {
      model = Product;
      field = "products";
      searchArea = ["title", "brand", "size", "version"];

      searchAreaForArrayFields = [
        { "size.name": { $regex: searchField, $options: "i" } },
        { "version.name": { $regex: searchField, $options: "i" } },
        { "color.name": { $regex: searchField, $options: "i" } },
      ];

      filedToShow = {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        quantity: 1,
        quantity: 1,
        brand: 1,
        ratings: 1,
        totalrating: 1,
        images: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };
    }

    if (action === "orders") {
      model = Order;
      field = "orders";
      searchArea = ["orderCode", "orderbyEmail"];

      filedToShow = {
        _id: 1,
        orderCode: 1,
        orderby: 1,
        orderbyEmail: 1,
        orderStatus: 1,
        paymentIntent: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };

      if (filter) {
        additionalMatch = { orderStatus: filter };
      }
    }

    if (action === "coupons") {
      model = Coupon;
      field = "coupons";
      searchArea = ["name"];

      filedToShow = {
        _id: 1,
        name: 1,
        expiry: 1,
        isActive: 1,
        updatedAt: 1,
        createdAt: 1,
        score: { $meta: "searchScore" },
      };

      if (filter) {
        additionalMatch = { orderStatus: filter };
      }
    }

    const transformedMatch = [
      ...searchArea.map((field) => ({
        [field]: { $regex: searchField, $options: "i" },
      })),
      ...searchAreaForArrayFields,
    ];

    const aggregate = model.aggregate([
      {
        $match: {
          $or: [...transformedMatch],
          ...additionalMatch,
        },
      },
      {
        $project: filedToShow,
      },
    ]);
    const total = await aggregate;

    const features = new APIFeatures(aggregate, req.query).sort().paginate();

    const data = await features.query;

    res.status(200).json({
      status: "success",
      data: { total: total.length, [field]: data },
    });
  });
