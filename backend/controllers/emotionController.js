const Music = require("../models/songs");
const axios = require("axios");
const FormData = require("form-data");

exports.uploadMusic = async (req, res) => {
    try {
        console.log("✅ Request Body:", req.body);
        console.log("✅ Uploaded Files:", req.files);

        const { title, emotion } = req.body;

        if (!req.files || !req.files["musicFile"]) {
            return res.status(400).json({ message: "Music file is required." });
        }

        const musicFile = req.files["musicFile"][0]?.path;
        const thumbnail = req.files["thumbnail"]?.[0]?.path || null;

        const newMusic = new Music({ title, emotion, musicFile, thumbnail });
        await newMusic.save();

        res.json({ message: "✅ Music uploaded successfully!", music: newMusic });

    } catch (error) {
        console.error("❌ Error uploading music:", JSON.stringify(error, null, 2));
        res.status(500).json({ 
            message: "❌ Failed to upload music.", 
            error: error.message || JSON.stringify(error)
        });
    }
};

exports.getMusicByEmotion = async (req, res) => {
    try {
        console.log("🎵 Fetching music for emotion:", req.params.emotion);

        const musicList = await Music.find({ emotion: req.params.emotion });

        res.json({ message: "✅ Music list fetched!", music: musicList });

    } catch (error) {
        console.error("❌ Error fetching music:", JSON.stringify(error, null, 2));
        res.status(500).json({ 
            message: "❌ Failed to fetch music.", 
            error: error.message || JSON.stringify(error)
        });
    }
};

exports.detectEmotion = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required for emotion detection." });
        }

        const formData = new FormData();
        formData.append("image", req.file.buffer, { filename: "image.jpg" });

        const response = await axios.post("http://127.0.0.1:5000/detect_emotion", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        res.json({ emotion: response.data.emotion });
    } catch (error) {
        console.error("❌ Error detecting emotion:", JSON.stringify(error, null, 2));
        res.status(500).json({ 
            message: "❌ Failed to detect emotion.", 
            error: error.message || JSON.stringify(error)
        });
    }
};