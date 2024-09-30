const asyncHandler = require("express-async-handler");

const Category = require("../models/prodcategoryModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { resizeImg } = require("../middlewares/uploadImage");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.getAllCategory = asyncHandler(async (req, res) => {
  //Note: for a normal store, there is not many categories, so no need the pagination for this
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  // .paginate();

  const total = new APIFeatures(Category.countDocuments(), req.query).filter();

  const categories = await features.query;
  const totalCategory = await total.query;

  res.status(200).json({
    status: "success",
    data: { total: totalCategory.length, categories },
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const files = req.files;
  const imgUrl = [];

  if (!title) throw new AppError("A category must has a title", 400);
  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }
  const newCategory = await Category.create({
    title,
    images: imgUrl,
  });

  res.status(201).json({
    status: "success",
    newCategory,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { categoryId, title } = req.body;
  validateMongoDbId(categoryId);
  const files = req.files;
  const imgUrl = [];
  let object = {};

  if (!title) throw new AppError("A brand must has a title", 400);

  const category = await Category.findById(categoryId);
  if (!category) throw new AppError("Brand not found", 404);
  let oldImages = category.images;

  if (files.length > 0) {
    for (const file of files) {
      const info = await resizeImg(file);
      imgUrl.push(info);
    }
    object = { title: title, images: imgUrl };
  } else {
    object = { title: title };
  }

  const updatedCategory = await Category.findByIdAndUpdate(categoryId, object, {
    new: true,
  });

  if (files.length > 0) {
    oldImages.map(async (image) => {
      await cloudinaryDeleteImg(image.public_id);
    });
  }

  res.status(200).json({
    status: "success",
    updatedCategory,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const category = await Category.findById(id);
  if (!category) throw new AppError("Brand not found", 404);
  let oldImages = category.images;

  await Category.findByIdAndDelete(id);

  oldImages.map(async (image) => {
    await cloudinaryDeleteImg(image.public_id);
  });

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
