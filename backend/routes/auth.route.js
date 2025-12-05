const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const signupSchema = require("../validator/auth.validator");
const validate = require("../middleware/validate.middleware");
const AuthMiddleware = require("../middleware/auth.middleware");

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(AuthMiddleware, authController.user);

module.exports = router;
