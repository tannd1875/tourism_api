const { getProvinceList } = require("../controllers/province.controller");
const express = require("../node_modules/express");
const router = express.Router();

router.get("/", getProvinceList);

module.exports = router;
