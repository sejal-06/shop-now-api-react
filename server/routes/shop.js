const path = require("path");
const shopController = require("../controller/shop");

const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router({ caseSensitive: false });

router.get("/allproducts/:pageno", shopController.productsafterpagination);

router.get("/allproducts", shopController.allproducts);
router.get("/countofallproducts", shopController.countofallproducts);
router.get(
  "/allproductsbycategory/:category",
  shopController.allproductsbycategory
);

router.get("/addtocart/:productId/:quantity", isAuth, shopController.addtocart);

router.get("/addtowishlist/:productId", isAuth, shopController.addtowishlist);

router.get(
  "/allproductsofwishlist",
  isAuth,
  shopController.allproductsofwishlist
);

router.get("/allproductsofcart", isAuth, shopController.allproductsofcart);

router.get("/product/:productId", shopController.product);

router.get("/deletefromcart/:productId", isAuth, shopController.deletefromcart);

router.get(
  "/changequantityofcartto/:productId/:count",
  isAuth,
  shopController.changequantityofcartto
);

router.get(
  "/deletefromwishlist/:productId",
  isAuth,
  shopController.deletefromwishlist
);

router.post("/placeorder", isAuth, shopController.placeorder);

router.get("/allorders", isAuth, shopController.allorders);
// router.get('/checkout', isAuth, shopController.getCheckout);

// router.get('/orders/:orderId', isAuth, shopController.getInvoice);

router.get("/getinvoice/:productId", isAuth, shopController.getinvoice);
module.exports = router;
