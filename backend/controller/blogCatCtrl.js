const asyncHandler = require("express-async-handler");

const Category = require("../models/blogCatModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createCategory = asyncHandler(async (req, res) => {
  if (!req.body.title)
    throw new AppError("Please provide all information", 400);

  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    newCategory,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedCategory) throw new AppError("Category not found", 404);

  res.status(200).json({
    status: "success",
    updatedCategory,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) throw new AppError("Category not found", 404);

  res.status(204).json();
});

exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const getaCategory = await Category.findById(id);
  if (!getaCategory) throw new AppError("Category not found", 404);

  res.status(200).json({
    status: "success",
    getaCategory,
  });
});

exports.getallCategory = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Category.countDocuments(), req.query).filter();

  const categories = await features.query;
  const totalCategories = await total.query;

  res.status(200).json({
    status: "success",
    totalCategory: totalCategories.length,
    categories,
  });
});
