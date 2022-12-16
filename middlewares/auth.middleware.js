const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const AppError = require("../utils/app-error");
async function authMiddleware(req, res, next) {
  //write logic code here

  try {
    const token = req.headers["x-access-token"].split(" ");
    if (token[0] !== "Bearer") throw new Error("Invalid type of token");

    const result = jwt.verify(token[1], process.env.JWT_TOKEN);

    req.user = { id: result.id, email: result.email };
    next();
  } catch (err) {
    next(new AppError(err.message, 401));
  }

  //nextFunction()
}
module.exports = authMiddleware;
