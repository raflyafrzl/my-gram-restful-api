function authMiddleware(req, res, next) {
  const token = req.headers["x-access-token"];
  //write logic code here

  //nextFunction()
  next();
}
