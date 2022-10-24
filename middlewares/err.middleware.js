const AppError = require("../utils/app-error");

const errorResponse = (err, res) => {
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};
const validationError = (err) => {
  const errors = Object.values(err.errors).map((value) => value.message);
  return new AppError(errors, 400);
};

function errMiddleware(err, req, res, next) {
  let error = Object.assign(err);
  console.log(error.status);
  if (err.name === "SequelizeValidationError") {
    error = validationError(error);
  }

  errorResponse(error, res);
}

module.exports = errMiddleware;
