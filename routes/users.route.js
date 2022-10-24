const router = require("express").Router();
const userController = require("../controllers/users.controller");
const catchAsync = require("../utils/catchPromise");

router.route("/register").post(userController.insertUser);
router.route("/login").post(userController.loginUser);

router.route("/:userId").put(userController.updateUser);

module.exports = router;
