const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const { logoutUser } = require("../controllers/userController");

router.post("/logout", auth, logoutUser);


router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
