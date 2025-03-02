const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

router.get("/:lat/:lon", getWeather);

module.exports = router;
