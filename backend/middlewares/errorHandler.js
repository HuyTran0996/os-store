const AppError = require("../utils/appError");

const urlNotFound = (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(statuscode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { errorHandler, urlNotFound };
