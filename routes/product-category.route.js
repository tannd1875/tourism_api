const express = require("express");
const {
  getProductCategoryList,
} = require("../controllers/product-category.controller");
const router = express.Router();

router.get("/", getProductCategoryList);

module.exports = router;
