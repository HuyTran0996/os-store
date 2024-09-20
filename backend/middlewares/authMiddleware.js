const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  // if (
  //   req.header.authorization &&
  //   req.header.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  if (req.cookies.refreshToken) {
    token = req.cookies.refreshToken;
  }

  if (!token) {
    throw new AppError("Please log in to get access", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  validateMongodbId(decoded.id);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    throw new AppError(
      "the user belonging to this token is no longer exist",
      401
    );
  }

  req.user = currentUser;
  next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin" && role !== "manager") {
    throw new AppError("you are not an admin", 401);
  }
  next();
});
exports.isManager = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "manager") {
    throw new AppError("you are not a manager", 401);
  }
  next();
});
