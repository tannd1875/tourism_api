const express = require("express");
const router = express.Router();

const {
  getDirection,
  getDirectionByAddress,
  getDirectionByAddressAndTitle,
  getDirectionByTitle,
  getDirectionList,
  getDirectionListByPage,
  getDirectionListByClassification,
  getProvinceList,
  getClassifyList,
} = require("../controllers/direction.controller");

router.get("/", getDirectionList);

router.get("/province", getProvinceList);

router.get("/classification", getClassifyList);

router.get("/address", getDirectionByAddress);

router.get("/title", getDirectionByTitle);

router.get("/address_title", getDirectionByAddressAndTitle);

router.get("/page/:page", getDirectionListByPage);

router.get("/classify", getDirectionListByClassification);

router.get("/:id", getDirection);

module.exports = router;
