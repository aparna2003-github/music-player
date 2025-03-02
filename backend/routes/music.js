const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const musicController = require("../controllers/musicController");

console.log("🎵 Loaded Music Controller:", musicController); // Add this to debug

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.mimetype.startsWith("audio/")) {
            return { folder: "music", resource_type: "video", format: "mp3" };
        } else if (file.mimetype.startsWith("image/")) {
            return { folder: "thumbnails", resource_type: "image", format: "png" };
        }
    },
});

const upload = multer({ storage: storage });

// ✅ Debug if functions exist
console.log("🎵 getMusicByWeather:", typeof musicController.getMusicByWeather);
console.log("🎵 uploadMusic:", typeof musicController.uploadMusic);

// If functions are undefined, the import has failed

router.post("/upload", upload.fields([
    { name: "musicFile", maxCount: 1 }, 
    { name: "thumbnail", maxCount: 1 }
]), musicController.uploadMusic);

router.get("/playlist/:weather", musicController.getMusicByWeather);

module.exports = router;
