const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controller/auth");
const isAuth = require("../middleware/is-auth");
const router = express.Router({ caseSensitive: false });

router.get("/isauth", isAuth, authController.isauth);

router.post(
  "/resetmail",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
  ],
  authController.resetmail
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password", "Please enter at least 5 characters or numbers")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/changepass/:resettoken",
  [
    body("password", "Please enter at least 5 characters or numbers")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.changepass
);

module.exports = router;
