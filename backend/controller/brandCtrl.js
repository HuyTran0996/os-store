const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createBrand = asyncHandler(async (req, res) => {
  if (!req.body.title)
    throw new AppError("Please provide all information", 400);

  const newBrand = await Brand.create(req.body);

  res.status(201).json({
    status: "success",
    newBrand,
  });
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedBrand) throw new AppError("Brand not found", 404);

  res.status(200).json({
    status: "success",
    updatedBrand,
  });
});

exports.deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedBrand = await Brand.findByIdAndDelete(id);
  if (!deletedBrand) throw new AppError("Brand not found", 404);

  res.status(204).json();
});

exports.getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const getaBrand = await Brand.findById(id);
  if (!getaBrand) throw new AppError("Brand not found", 404);

  res.status(200).json({
    status: "success",
    getaBrand,
  });
});

exports.getallBrand = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Brand.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Brand.countDocuments(), req.query).filter();

  const brands = await features.query;
  const totalBrands = await total.query;

  res.status(200).json({
    status: "success",
    totalBrand: totalBrands.length,
    brands,
  });
});
