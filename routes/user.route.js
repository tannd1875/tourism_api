const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createUser,
  getUserList,
  authenticateUser,
  logoutUser,
  updateUser,
} = require("../controllers/user.controller");

const upload = multer({ dest: "uploads/" });

router.get("/", getUserList);
router.post("/signup", createUser);
router.post("/signin", authenticateUser);
router.post("/signout", logoutUser);
router.put("/update", upload.single("avatar"), updateUser);

module.exports = router;
