const express = require("express");
const { getBrandList } = require("../controllers/brand.controller");
const router = express.Router();

router.get("/", getBrandList);
module.exports = router;
