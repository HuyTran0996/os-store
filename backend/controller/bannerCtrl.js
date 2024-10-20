const asyncHandler = require("express-async-handler");

const Banner = require("../models/bannerModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { resizeImg } = require("../middlewares/uploadImage");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.getAllBanner = asyncHandler(async (req, res) => {
  //Note: for a normal store, there is not many banner, so no need the pagination for this
  const features = new APIFeatures(Banner.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  // .paginate();

  const total = new APIFeatures(Banner.countDocuments(), req.query).filter();

  const banners = await features.query;
  const totalBanner = await total.query;

  res.status(200).json({
    status: "success",
    data: { total: totalBanner.length, banners },
  });
});

exports.createBanner = asyncHandler(async (req, res) => {
  const { title, prodName, productID, description } = req.body;
  const files = req.files;
  const imgUrl = [];

  validateMongoDbId(productID);

  if (!title) throw new AppError("A banner must has a title", 400);

  for (const file of files) {
    const info = await resizeImg(file, "banner");
    imgUrl.push(info);
  }
  const newBanner = await Banner.create({
    title,
    prodName,
    productID,
    description,
    images: imgUrl,
  });

  res.status(201).json({
    status: "success",
    newBanner,
  });
});

exports.updateBanner = asyncHandler(async (req, res) => {
  const { brandId, title, prodName, productID, description } = req.body;
  validateMongoDbId(brandId);
  validateMongoDbId(productID);
  const files = req.files;
  const imgUrl = [];
  let object = {};

  if (!title) throw new AppError("A banner must has a title", 400);

  const banner = await Banner.findById(brandId);
  if (!banner) throw new AppError("Banner not found", 404);
  let oldImages = banner.images;

  if (files.length > 0) {
    for (const file of files) {
      const info = await resizeImg(file, "banner");
      imgUrl.push(info);
    }
    object = {
      images: imgUrl,
      title,
      prodName,
      productID,
      description,
    };
  } else {
    object = { title, prodName, productID, description };
  }

  const updatedBanner = await Banner.findByIdAndUpdate(brandId, object, {
    new: true,
  });

  if (files.length > 0) {
    oldImages.map(async (image) => {
      await cloudinaryDeleteImg(image.public_id);
    });
  }

  res.status(200).json({
    status: "success",
    updatedBanner,
  });
});

exports.deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const banner = await Banner.findById(id);
  if (!banner) throw new AppError("Banner not found", 404);
  let oldImages = banner.images;

  await Banner.findByIdAndDelete(id);

  oldImages.map(async (image) => {
    await cloudinaryDeleteImg(image.public_id);
  });

  res.status(204).json();
});
