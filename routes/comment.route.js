const router = require("express").Router();
const commentController = require("../controllers/comment.controller");
const catchAsync = require("../utils/catchPromise");
router
  .route("/")
  .get(catchAsync(commentController.getAllComment))
  .post(catchAsync(commentController.insertComment));

router.route("/:comId").delete(catchAsync(commentController.deleteComment));

module.exports = router;
