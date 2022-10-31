const jwt = require("jsonwebtoken");
const AppError = require("../utils/app-error");

function authMiddleware(req, res, next) {
  //write logic code here

  try {
    const token = req.headers["x-access-token"].split(" ");
    if (token[0] !== "Bearer") throw new Error("Invalid token");
    const result = jwt.verify(token[1], process.env.JWT_TOKEN);

    req.user = { id: result.id, email: result.email };
    next();
  } catch (err) {
    next(err);
  }

  //nextFunction()
}
module.exports = authMiddleware;
