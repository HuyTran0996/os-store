const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { resizeImg } = require("../middlewares/uploadImage");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.getAllBrand = asyncHandler(async (req, res) => {
  const tagTitle = req.query.tag;
  if (tagTitle) {
    const brands = await Brand.find({
      tag: { $elemMatch: { title: tagTitle } },
    }).sort("title");
    if (!brands) throw new AppError("Brand not found", 404);
    const totalBrand = brands.length;
    return res.status(200).json({
      status: "success",
      data: { total: totalBrand.length, brands },
    });
  }

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
  const { title, tag } = req.body;
  const files = req.files;
  const imgUrl = [];
  let tagArray = [];

  if (!title) throw new AppError("A brand must has a title", 400);
  if (tag) tagArray = JSON.parse(tag);

  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }
  const newBrand = await Brand.create({
    title,
    tag: [...tagArray],
    images: imgUrl,
  });

  res.status(201).json({
    status: "success",
    newBrand,
  });
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const { brandId, title, tag } = req.body;
  validateMongoDbId(brandId);
  const files = req.files;
  const imgUrl = [];
  let tagArray = [];
  let object = {};

  if (!title) throw new AppError("A brand must has a title", 400);
  if (tag) tagArray = JSON.parse(tag);

  const brand = await Brand.findById(brandId);
  if (!brand) throw new AppError("Brand not found", 404);
  let oldImages = brand.images;

  if (files.length > 0) {
    for (const file of files) {
      const info = await resizeImg(file);
      imgUrl.push(info);
    }
    object = { title: title, images: imgUrl, tag: [...tagArray] };
  } else {
    object = { title: title, tag: [...tagArray] };
  }

  const updatedBrand = await Brand.findByIdAndUpdate(brandId, object, {
    new: true,
  });

  if (files.length > 0) {
    oldImages.map(async (image) => {
      await cloudinaryDeleteImg(image.public_id);
    });
  }

  res.status(200).json({
    status: "success",
    updatedBrand,
  });
});

exports.deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const brand = await Brand.findById(id);
  if (!brand) throw new AppError("Brand not found", 404);
  let oldImages = brand.images;

  await Brand.findByIdAndDelete(id);

  oldImages.map(async (image) => {
    await cloudinaryDeleteImg(image.public_id);
  });

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
