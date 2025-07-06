const express = require("express");
const {
  addProductToCart,
  getUserCart,
  updateItemInCart,
  deleteItemFromCart,
  getCartList,
} = require("../controllers/cart.controller");
const router = express.Router();

router.get("/", getCartList);
router.get("/:userId", getUserCart);
router.post("/", addProductToCart);
router.put("/", updateItemInCart);
router.put("/delete", deleteItemFromCart);

module.exports = router;
