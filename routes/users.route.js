const router = require("express").Router();
const userController = require("../controllers/users.controller");
router
  .route("/register")
  .get(userController.getAllUsers)
  .post(userController.insertUser);

router.route("/login").post(userController.loginUser);

module.exports = router;
