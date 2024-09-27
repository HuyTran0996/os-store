const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { resizeImg } = require("../middlewares/uploadImage");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.getAllBrand = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Brand.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Brand.countDocuments(), req.query).filter();

  const brands = await features.query;
  const totalBrand = await total.query;

  res.status(200).json({
    status: "success",
    data: { total: totalBrand.length, brands },
  });
});

exports.createBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const files = req.files;
  const imgUrl = [];

  if (!title) throw new AppError("A brand must has a title", 400);
  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }
  const newBrand = await Brand.create({
    title,
    images: imgUrl,
  });

  res.status(201).json({
    status: "success",
    newBrand,
  });
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const { brandId, title } = req.body;
  validateMongoDbId(brandId);

  const files = req.files;
  const imgUrl = [];
  let object = {};

  if (!title) throw new AppError("A brand must has a title", 400);
  if (files.length > 0) {
    for (const file of files) {
      const info = await resizeImg(file);
      imgUrl.push(info);
    }
    object = { title: title, images: imgUrl };
  } else {
    object = { title: title };
  }

  const updatedBrand = await Brand.findByIdAndUpdate(brandId, object, {
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
