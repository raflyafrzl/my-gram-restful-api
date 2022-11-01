const router = require("express").Router();
const photoController = require("../controllers/photo.controller");
const photo = require("../models/photo");
const catchAsync = require("../utils/catchPromise");

router
  .route("/")
  .get(catchAsync(photoController.getAllPhotos))
  .post(catchAsync(photoController.createPhoto));

module.exports = router;
