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

const jwtError = (err) => {
  const message = "Invalid Token. Please check the token again";

  return new AppError(message, 401);
};

const typeError = (err) => {
  const message = "Something went very wrong";

  return new AppError(message, 500);
};

const invalidUuidError = (err) => {
  const valueId = err.message.split('"');
  const message = `ID(${valueId[1]}) is not valid. please check again`;
  return new AppError(message, 404);
};

function errMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  // console.log(err);
  let error = Object.assign(err);

  if (err.name === "SequelizeValidationError") {
    error = validationError(error);
  }

  if (err.name === "SequelizeDatabaseError") {
    if (err.message.includes("type uuid")) {
      error = invalidUuidError(error);
    }
  }

  if (err.name === "TypeError") {
    error = typeError(error);
  }

  if (err.name === "JsonWebTokenError") {
    error = jwtError(error);
  }

  if (err.message.includes("split")) {
    error = jwtError(error);
  }

  errorResponse(error, res);
}

module.exports = errMiddleware;
