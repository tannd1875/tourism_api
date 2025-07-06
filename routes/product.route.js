const express = require("express");
const router = express.Router();

const {
  getProductList,
  getProduct,
} = require("../controllers/product.controller");

router.get("/", getProductList);
router.get("/:id", getProduct);

module.exports = router;
