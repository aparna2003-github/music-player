const express = require("express");
const axios = require("axios");

const router = express.Router();

// Emotion detection route
router.post("/detect", async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: "No image provided"});
        }

        // Send to Python DeepFace server
        const response = await axios.post("http://127.0.0.1:5000/detect", { image });

        res.json(response.data); // Forward response to frontend
    } catch (error) {
        console.error("Emotion detection failed:", error.message);
        res.status(500).json({ error: "Emotion detection failed" });
    }
});

module.exports = router;
