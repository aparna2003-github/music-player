const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - Get user profile
router.get("/profile", protect, getUserProfile);

module.exports = router;
