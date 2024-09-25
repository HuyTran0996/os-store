const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const Product = require("../models/productModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");
const APIFeatures = require("../utils/apiFeatures");

const { resizeImg } = require("../middlewares/uploadImage");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.createProduct = asyncHandler(async (req, res) => {
  const { title, size, version } = req.body;
  const files = req.files;
  const imgUrl = [];
  let sizeArray = [];
  let versionArray = [];
  if (!title) throw new AppError("A product must has a title", 400);

  if (size) sizeArray = JSON.parse(req.body.size);
  if (version) versionArray = JSON.parse(req.body.version);

  req.body.slug = slugify(title);

  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }

  const newProduct = await Product.create({
    ...req.body,
    size: [...sizeArray],
    version: [...versionArray],
    images: imgUrl,
  });

  res.status(201).json({
    status: "success",
    newProduct,
  });
});

exports.uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const imgUrl = [];
  validateMongodbId(id);

  const findProduct = await Product.findById(id);
  if (!findProduct) throw new AppError("Product not found", 404);

  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $addToSet: { images: { $each: imgUrl.flat() } },
    },
    { new: true }
  );

  if (!updatedProduct) throw new AppError("Product not found", 404);

  res.status(200).json({
    status: "success",
    updatedProduct,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  validateMongodbId(id);
  if (title) req.body.slug = slugify(title);
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    updateProduct,
  });
});

exports.addVariant = asyncHandler(async (req, res) => {
  const { prodId, tag, name, image } = req.body;
  if (!prodId || !tag || !name || !image)
    throw new AppError("Missing required files", 400);
  validateMongodbId(prodId);
  const product = await Product.findById(prodId);
  if (!product) throw new AppError("Product not found", 404);

  const check = product.variant.find((v) => v.name === name.toLowerCase());

  if (check) throw new AppError("Duplicate variant names are not allowed", 409);

  const updateProduct = await Product.findByIdAndUpdate(
    prodId,
    {
      $addToSet: { variant: { prodId, tag, name, image } },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    updateProduct,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  await Product.findByIdAndDelete(id);
  res.status(204).json();
});

exports.getAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const findProduct = await Product.findById(id);
  if (!findProduct) throw new AppError("Product not found", 404);
  res.status(200).json({
    status: "success",
    findProduct,
  });
});

exports.getAllProduct = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Product.countDocuments(), req.query).filter();

  const products = await features.query;
  const totalProduct = await total.query;

  res.status(200).json({
    status: "success",
    totalProduct: totalProduct.length,
    products,
  });
});

exports.toggleWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  validateMongodbId(prodId);

  const alreadyAdded = req.user.wishlist.find((id) => id.toString() === prodId);
  let method;
  let message;

  if (alreadyAdded) {
    method = "$pull";
    message = "remove from wishlist";
  } else {
    method = "$push";
    message = "add to wishlist";
  }

  const user = await User.findByIdAndUpdate(
    _id,
    {
      [method]: { wishlist: prodId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message,
    wishlist: user.wishlist,
  });
});

exports.rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  if (!star || !prodId || !comment)
    throw new AppError("Missing required files", 400);

  validateMongodbId(prodId);

  const product = await Product.findById(prodId);

  if (!product) throw new AppError("Product not found", 404);

  const alreadyRated = product.ratings.find(
    (userId) => userId.postedby.toString() === _id.toString()
  );

  if (alreadyRated) {
    alreadyRated.star = star;
    alreadyRated.comment = comment;
  } else {
    product.ratings.push({
      star,
      comment,
      postedby: _id,
    });
  }

  await product.save();

  res.status(200).json({
    status: "success",
    message: "Rating has been added/updated",
    product,
  });
});

exports.deleteImages = asyncHandler(async (req, res) => {
  const { productId, publicId } = req.body;

  validateMongodbId(productId);
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $pull: {
        images: {
          public_id: publicId,
        },
      },
    },
    { new: true }
  );
  if (!updatedProduct) {
    throw new AppError("Failed to update product", 500);
  }

  const deleted = await cloudinaryDeleteImg(publicId, "images");

  res.status(204).json({
    status: "success",
  });
});
