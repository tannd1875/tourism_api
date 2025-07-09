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

const {
  autoGenerateToken,
} = require("../controllers/middleware/auth.middleware");

const { verify } = require("../controllers/middleware/auth.middleware");

const upload = multer({ dest: "uploads/" });

router.get("/", getUserList);
router.post("/signup", createUser);
router.post("/signin", authenticateUser);
router.post("/signout", logoutUser);
router.put("/update", upload.single("avatar"), verify, updateUser);
router.post("/refresh_token", autoGenerateToken);

module.exports = router;
