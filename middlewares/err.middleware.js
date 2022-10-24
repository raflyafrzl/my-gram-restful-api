const AppError = require("../utils/app-error");

const errorResponse = (err, res) => {
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};
const validationError = (err) => {
  const errors = Object.values(err.errors).map(
    (value) => `[${value.message}: ${value.value}]`
  );
  return new AppError(errors, 400);
};

const typeErrorDB = (err) => {
  const message = "Data not found, please register first";

  return new AppError(message, 404);
};

function errMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  console.log(err.name);
  let error = Object.assign(err);

  if (err.name === "SequelizeValidationError") {
    error = validationError(error);
  }
  if (err.name === "TypeError") {
    error = typeErrorDB(error);
  }

  errorResponse(error, res);
}

module.exports = errMiddleware;
