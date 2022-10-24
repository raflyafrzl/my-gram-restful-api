const router = require("express").Router();
const userController = require("../controllers/users.controller");
const catchAsync = require("../utils/catchPromise");

router.route("/register").post(catchAsync(userController.insertUser));
router.route("/login").post(catchAsync(userController.loginUser));

router.route("/:userId").put(userController.updateUser);

module.exports = router;
