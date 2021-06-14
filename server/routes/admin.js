const path = require("path");
const express = require("express");
const { check, body } = require("express-validator/check");
const multer = require("multer");

const isAuth = require("../middleware/is-auth");
const adminController = require("../controller/admin");

const router = express.Router({ caseSensitive: false });

const uploader = multer({
  storage: multer.memoryStorage(), //using this req.file contain field buffer containing whole image file
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

router.post(
  "/addproduct",
  isAuth,
  uploader.single("imageUrl"),
  [
    body("title").trim(),
    body("price", "price should be interger").isInt({ min: 0 }),
    body("description", "description should contain 100 to 500 words")
      .isLength({ min: 100, max: 500 })
      .trim(),
  ],
  adminController.postAddProduct
);

router.post(
  "/editproduct/:productId",
  isAuth,
  uploader.single("imageUrl"),
  [
    body("title").trim(),
    body("price", "price should be interger").isInt({ min: 0 }),
    body("description", "description should contain 100 to 500 words")
      .isLength({ min: 100, max: 500 })
      .trim(),
  ],
  adminController.postEditProduct
);

router.get("/productsbyuser", isAuth, adminController.adminProducts);

router.get("/deleteproduct/:productId", isAuth, adminController.deleteProduct);
module.exports = router;
