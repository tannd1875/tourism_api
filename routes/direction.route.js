const express = require("express");
const router = express.Router();

const {
  getDirection,
  getDirectionByAddress,
  getDirectionByAddressAndTitle,
  getDirectionByTitle,
  getDirectionList,
  getDirectionListByPage,
} = require("../controllers/direction.controller");

router.get("/", getDirectionList);

router.get("/address", getDirectionByAddress);

router.get("/title", getDirectionByTitle);

router.get("/address_title", getDirectionByAddressAndTitle);

router.get("/page/:page", getDirectionListByPage);

router.get("/:id", getDirection);
// router.post("/", createDirection);

// router.delete("/:id", deleteDirection);

// router.put("/:id", updateDirection);

module.exports = router;
