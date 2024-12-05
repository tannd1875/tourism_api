const express = require("express");
const router = express.Router();
const { getTip, getTipList } = require("../controllers/tip.controller");

router.get("/", getTipList);
router.get("/:id", getTip);

// router.post("/", createTip);
// router.put("/:id", updateTip);
// router.delete("/:id", deleteTip);

module.exports = router;
