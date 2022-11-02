const router = require("express").Router();
const photoController = require("../controllers/photo.controller");
const photo = require("../models/photo");
const catchAsync = require("../utils/catchPromise");

router
  .route("/")
  .get(catchAsync(photoController.getAllPhotos))
  .post(catchAsync(photoController.createPhoto));

router
  .route("/:photoId")
  .put(catchAsync(photoController.updatePhoto))
  .delete(catchAsync(photoController.deletePhoto));

module.exports = router;
