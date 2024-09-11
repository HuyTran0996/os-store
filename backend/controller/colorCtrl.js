const asyncHandler = require("express-async-handler");

const Color = require("../models/colorModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createColor = asyncHandler(async (req, res) => {
  if (!req.body.title)
    throw new AppError("Please provide all information", 400);

  const newColor = await Color.create(req.body);

  res.status(201).json({
    status: "success",
    newColor,
  });
});

exports.updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedColor) throw new AppError("Color not found", 404);

  res.status(200).json({
    status: "success",
    updatedColor,
  });
});

exports.deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedColor = await Color.findByIdAndDelete(id);
  if (!deletedColor) throw new AppError("Category not found", 404);

  res.status(204).json();
});

exports.getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const getaColor = await Color.findById(id);
  if (!getaColor) throw new AppError("Color not found", 404);

  res.status(200).json({
    status: "success",
    getaColor,
  });
});

exports.getAllColor = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Color.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Color.countDocuments(), req.query).filter();

  const colors = await features.query;
  const totalColors = await total.query;

  res.status(200).json({
    status: "success",
    totalCategory: totalColors.length,
    colors,
  });
});
