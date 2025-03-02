const express = require("express");
const router = express.Router();
const { getPlaylistByWeather, uploadSong } = require("../controllers/playlistController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "music",
    resource_type: "auto",
  },
});
const upload = multer({ storage });

router.get("/:weather", getPlaylistByWeather);
router.post("/upload", upload.single("song"), uploadSong);

module.exports = router;
