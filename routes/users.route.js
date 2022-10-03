const router = require("express").Router();
const userController = require("../controllers/users.controller");
router
  .route("/register")
  .get(userController.getAllUsers)
  .post(userController.insertUser);
router.route("/login").post(userController.loginUser);

router.route("/:userId").put(userController.updateUser);

module.exports = router;
