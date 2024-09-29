const asyncHandler = require("express-async-handler");

const Coupon = require("../models/couponModel");

const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body;
  if (!name || !expiry || !discount)
    throw new AppError("Please provide all information", 400);

  const newCoupon = await Coupon.create(req.body);
  res.status(201).json({
    status: "success",
    newCoupon,
  });
});

exports.updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, expiry, discount } = req.body;
  if (!name && !expiry && !discount)
    throw new AppError("Please provide information", 400);

  validateMongoDbId(id);

  const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatecoupon) throw new AppError("Coupon not found", 404);
  res.status(200).json({
    status: "success",
    updatecoupon,
  });
});

exports.deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletecoupon = await Coupon.findByIdAndDelete(id);
  if (!deletecoupon) throw new AppError("Coupon not found", 404);
  res.status(204).json();
});

exports.getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongoDbId(id);

  const getAcoupon = await Coupon.findById(id);

  if (!getAcoupon) throw new AppError("Coupon not found", 404);

  res.status(200).json({
    status: "success",
    getAcoupon,
  });
});

exports.getAllCoupons = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Coupon.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Coupon.countDocuments(), req.query).filter();

  const coupons = await features.query;
  const totalCoupons = await total.query;

  res.status(200).json({
    status: "success",
    totalCoupon: totalCoupons.length,
    coupons,
  });
});
