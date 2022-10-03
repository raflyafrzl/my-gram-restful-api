function errMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const errName = err.name || "error";

  res.status(status).send({
    status: errName,
    message: "Fail to access endpoint",
  });
}

module.exports = errMiddleware;
