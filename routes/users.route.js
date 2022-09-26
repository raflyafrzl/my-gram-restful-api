const router = require("express").Router();
const userController = require("../controllers/users.controller");
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.insertUser);

module.exports = router;
