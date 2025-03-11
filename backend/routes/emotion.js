const express = require("express");
const emotionController = require("../controllers/emotionController");

const router = express.Router();

// Route to detect emotion from camera feed
router.get("/detect", emotionController.detectEmotion); // Ensure function reference

// Route to fetch music based on detected emotion
router.get("/music/:emotion",emotionController.getMusicByEmotion);

module.exports = router;
