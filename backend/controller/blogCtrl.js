const asyncHandler = require("express-async-handler");
const fs = require("fs");

const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");

const { resizeImg } = require("../middlewares/uploadImage");

exports.createBlog = asyncHandler(async (req, res) => {
  const newBlog = await Blog.create(req.body);
  res.status(201).json({
    status: "success",
    newBlog,
  });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

  if (!updateBlog) throw new AppError("not found blog", 404);

  res.status(200).json({
    status: "success",
    updateBlog,
  });
});

exports.getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const getBlogAndUpdateViews = await Blog.findByIdAndUpdate(
    id,
    { $inc: { numViews: 1 } },
    { new: true }
  )
    .populate("likes")
    .populate("dislikes");

  if (!getBlogAndUpdateViews) throw new AppError("not found blog", 404);

  res.status(200).json({
    status: "success",
    getBlog: getBlogAndUpdateViews,
  });
});

exports.getAllBlog = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Blog.countDocuments(), req.query).filter();

  const blogs = await features.query;
  const totalBlog = await total.query;

  res.status(200).json({
    status: "success",
    totalBlog: totalBlog.length,
    blogs,
  });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) throw new AppError("not found blog", 404);

  res.status(204).json();
});

exports.toggleLikeDislike = (action) =>
  asyncHandler(async (req, res) => {
    const { blogId } = req.body;

    if (action !== "like" && action !== "dislike")
      throw new AppError("Invalid action", 400);

    validateMongodbId(blogId);

    const blog = await Blog.findById(blogId);

    if (!blog) throw new AppError("not found blog", 404);

    const isLiked = blog.likes.find(
      (userId) => userId.toString() === req.user._id.toString()
    );
    const isDisliked = blog.dislikes.find(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (isLiked && isDisliked) throw new AppError("something goes wrong", 409);

    if (action === "like") {
      if (isLiked) {
        await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: req.user._id },
          },
          { new: true }
        );
      }
      if (!isLiked) {
        await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: req.user._id },
            $pull: { dislikes: req.user._id },
          },
          { new: true }
        );
      }
    } else if (action === "dislike") {
      if (isDisliked) {
        await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { dislikes: req.user._id },
          },
          { new: true }
        );
      }
      if (!isDisliked) {
        await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { dislikes: req.user._id },
            $pull: { likes: req.user._id },
          },
          { new: true }
        );
      }
    }
    res.status(200).json({ status: "success" });
  });

exports.uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const imgUrl = [];
  validateMongodbId(id);

  const findBlog = await Blog.findById(id);
  if (!findBlog) throw new AppError("Blog not found", 404);

  for (const file of files) {
    const info = await resizeImg(file);
    imgUrl.push(info);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      $push: {
        images: [...imgUrl],
      },
    },
    { new: true }
  );

  if (!updatedBlog) throw new AppError("Blog not found", 404);

  res.status(200).json({
    status: "success",
    updatedBlog,
  });
});

exports.deleteImages = asyncHandler(async (req, res) => {
  const { blogId, publicId } = req.body;

  validateMongodbId(blogId);

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $pull: {
        images: {
          public_id: publicId,
        },
      },
    },
    { new: true }
  );
  if (!updatedBlog) {
    throw new AppError("Failed to update blog", 500);
  }

  const deleted = await cloudinaryDeleteImg(publicId, "images");

  res.status(204).json({
    status: "success",
  });
});
