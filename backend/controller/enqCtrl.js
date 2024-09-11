const asyncHandler = require("express-async-handler");

const Enquiry = require("../models/enqModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, mobile, comment } = req.body;
  if (!name || !email || !mobile || !comment)
    throw new AppError("Please provide all information", 400);

  const newEnquiry = await Enquiry.create(req.body);

  res.status(201).json({
    status: "success",
    newEnquiry,
  });
});

exports.updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedEnquiry) throw new AppError("Enquiry not found", 404);

  res.status(200).json({
    status: "success",
    updatedEnquiry,
  });
});

exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
  if (!deletedEnquiry) throw new AppError("Enquiry not found", 404);

  res.status(204).json();
});

exports.getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const getaEnquiry = await Enquiry.findById(id);
  if (!getaEnquiry) throw new AppError("Enquiry not found", 404);

  res.status(200).json({
    status: "success",
    getaEnquiry,
  });
});

exports.getallEnquiry = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Enquiry.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Enquiry.countDocuments(), req.query).filter();

  const enquiries = await features.query;
  const totalEnquiries = await total.query;

  res.status(200).json({
    status: "success",
    totalEnquiry: totalEnquiries.length,
    enquiries,
  });
});
