const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishList,
  wishList,
  removeFromWishList,
  createCashOrder,
} = require("../controllers/user");

// User Cart
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

// User Address
router.post("/user/address", authCheck, saveAddress);

// User Order and Cash On Delivery Order
router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder);
router.get("/user/orders", authCheck, orders);

// User Coupons
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// User Wishlist
router.post("/user/wishlist", authCheck, addToWishList);
router.get("/user/wishlist", authCheck, wishList);
router.put("/user/wishlist/:productId", authCheck, removeFromWishList);

module.exports = router;
