const express = require("express");
const { getMusicByWeather } = require("../controllers/musicController");

const router = express.Router();

router.get("/:weather", getMusicByWeather); // Example: GET /api/music/sunny

module.exports = router;
