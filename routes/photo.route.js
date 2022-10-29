const router = require("express").Router();
const photoController = require("../controllers/photo.controller");
const catchAsync = require("../utils/catchPromise");

router.route("/").get(catchAsync(photoController.getAllPhotos));

module.exports = router;
