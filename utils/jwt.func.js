const jwt = require("jsonwebtoken");

function signJwt(data) {
  return jwt.sign(data, process.env.JWT_TOKEN);
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_TOKEN);
}

module.exports = { verifyJwt, signJwt };
