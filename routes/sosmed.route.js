const router = require("express").Router();
const catchAsync = require("../utils/catchPromise");
const SosmedController = require("../controllers/socialmedia.controller");

//route without id
router
  .route("/")
  .get(catchAsync(SosmedController.getAllSosmed))
  .post(catchAsync(SosmedController.createSosmed));

//route with params {sosId}
router
  .route("/:sosId")
  .delete(catchAsync(SosmedController.deleteSosmed))
  .put(catchAsync(SosmedController.updateSosmed));

module.exports = router;
