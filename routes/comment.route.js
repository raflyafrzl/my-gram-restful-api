const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router
  .route("/")
  .get(commentController.getAllComment)
  .post(commentController.insertComment);

module.exports = router;
