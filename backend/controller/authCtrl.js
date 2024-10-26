const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModel");

const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");
const Email = require("../utils/email");

const { generateToken, cookieOption } = require("../config/jwtToken");

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password)
    throw new AppError("Please provide all information", 400);

  const findUser = await User.findOne({ email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    const url = `${req.protocol}://${req.get("host")}/me`;
    await new Email(newUser, url).sendWelcome();

    res.status(201).json({ status: "success", newUser: newUser });
  } else {
    throw new AppError("User already exists", 409);
  }
});

exports.login = (action) =>
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      throw new AppError("Please provide email and password", 400);

    const findUser = await User.findOne({ email }).select("+password");

    if (findUser && (await findUser.isPasswordMatched(password))) {
      if (findUser.isBlocked) {
        throw new AppError("Account is no longer available", 401);
      }
      if (
        action === "admin" &&
        findUser.role !== "admin" &&
        findUser.role !== "manager"
      ) {
        throw new AppError("Unauthorized", 401);
      }

      const refreshToken = await generateToken(findUser._id);

      await User.findByIdAndUpdate(
        findUser._id,
        {
          refreshToken,
        },
        { new: true }
      );

      findUser.password = undefined;
      res.cookie("refreshToken", refreshToken, cookieOption);

      let responseData = {
        _id: findUser._id,
        email: findUser.email,
        name: findUser.name,
        phone: findUser.phone,
        wishlist: findUser.wishlist,
      };

      res.status(200).json({
        status: "success",
        //note: cookie is working so no need to send token for user
        // token: refreshToken,
        user: responseData,
      });
    } else {
      throw new AppError("Incorrect email or password", 401);
    }
  });

exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const accessToken = generateToken(req.user._id);
  res.status(201).json({
    status: "success",
    accessToken,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, password } = req.body;

  if (!password) throw new AppError("Please provide password", 400);

  validateMongodbId(_id);

  const user = await User.findById(_id).select("+password");

  const checkPassword = await user.isPasswordMatched(currentPassword);

  if (!checkPassword)
    throw new AppError("Current password is not correct", 401);

  user.password = password;
  await user.save();

  user.password = undefined;
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { frontEndLink, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new AppError("There is no user with email address", 404);

  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //note: we will use this url in future (when we create ui-ux of the back-end itself)
  // const resetURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/auth/resetPassword/${resetToken}`;

  const resetURL = `${frontEndLink}/${resetToken}`;
  await new Email(user, resetURL).sendPasswordReset();

  res.status(200).json({
    status: "success",
    message:
      "check your email and follow the instruction, the email works only in 10 minutes",
    resetURL,
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Token is invalid or has expired", 400);

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message:
      "Update password successfully, please login with your new password",
  });
});
