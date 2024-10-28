const asyncHandler = require("express-async-handler");

const Enquiry = require("../models/enqModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllEnquiry = asyncHandler(async (req, res) => {
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
    data: {
      total: totalEnquiries.length,
      enquiries,
    },
  });
});

exports.createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message)
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

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) throw new AppError("Enquiry not found", 404);

  res.status(200).json({
    status: "success",
    enquiry,
  });
});
