const express = require("express");
const router = express.Router();

const {
  getDirection,
  getDirectionList,
  getRecommendDirection,
} = require("../controllers/direction.controller");

router.get("/", getDirectionList);

router.get("/recommend", getRecommendDirection);

router.get("/:id", getDirection);

module.exports = router;
