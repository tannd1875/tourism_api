const express = require("express");
const {
  addProductToCart,
  getUserCart,
  updateItemInCart,
  deleteItemFromCart,
  getCartList,
} = require("../controllers/cart.controller");
const { verify } = require("../controllers/middleware/auth.middleware");
const router = express.Router();

router.get("/", getCartList);
router.get("/userCart", verify, getUserCart);
router.post("/", verify, addProductToCart);
router.put("/", verify, updateItemInCart);
router.put("/delete", verify, deleteItemFromCart);

module.exports = router;
