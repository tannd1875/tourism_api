const express = require("express");
const {
  getClassificationList,
} = require("../controllers/direction-category.controller");
const router = express.Router();

router.get("/", getClassificationList);

module.exports = router;
