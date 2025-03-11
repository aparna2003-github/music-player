const songs = require("../models/songs");
const Music = require("../models/songs");
// const Song = require("../models/songs");

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await songs.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addSong = async (req, res) => {
    try {
        const { title, thumbnail, weather, emotion, mp3 } = req.body;
        const newSong = new Song({ title, thumbnail, weather, emotion, mp3 });
        await newSong.save();
        res.status(201).json({ message: "Song added successfully", song: newSong });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.uploadMusic = async (req, res) => {
    try {
        console.log("✅ Request Body:", req.body);
        console.log("✅ Uploaded Files:", req.files);

        const { title, weatherCondition } = req.body;

        if (!req.files || !req.files["musicFile"]) {
            return res.status(400).json({ message: "Music file is required." });
        }

        const musicFile = req.files["musicFile"][0]?.path;
        const thumbnail = req.files["thumbnail"]?.[0]?.path || null;

        const newMusic = new Music({ title, weatherCondition, musicFile, thumbnail });
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

exports.getMusicByWeather = async (req, res) => {
    try {
        console.log("🎵 Fetching music for weather:", req.params.weather);

        const musicList = await Music.find({ weatherCondition: req.params.weather });

        res.json({ message: "✅ Music list fetched!", music: musicList });

    } catch (error) {
        console.error("❌ Error fetching music:", JSON.stringify(error, null, 2));
        res.status(500).json({ 
            message: "❌ Failed to fetch music.", 
            error: error.message || JSON.stringify(error)
        });
    }
};

exports.uploadMusic = async (req, res) => {
    try {
        console.log("✅ Request Body:", req.body);
        console.log("✅ Uploaded Files:", req.files);

        const { title, weatherCondition, emotion } = req.body;

        if (!req.files || !req.files["musicFile"]) {
            return res.status(400).json({ message: "Music file is required." });
        }

        const musicFile = req.files["musicFile"][0]?.path;
        const thumbnail = req.files["thumbnail"]?.[0]?.path || null;

        const newMusic = new Music({ title, weatherCondition, emotion, musicFile, thumbnail });
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

exports.getMusic = async (req, res) => {
    try {
        const { emotion } = req.query;

        console.log(`🎵 Fetching music for Emotion: ${emotion}`);

        if (!emotion) {
            return res.status(400).json({ message: "❌ Emotion is required!" });
        }

        // Fetch songs based on emotion
        const musicList = await Music.find({ emotion: { $regex: new RegExp(emotion, "i") } });

        res.json({ message: "✅ Music list fetched!", music: musicList });

    } catch (error) {
        console.error("❌ Error fetching music:", JSON.stringify(error, null, 2));
        res.status(500).json({ 
            message: "❌ Failed to fetch music.", 
            error: error.message || JSON.stringify(error)
        });
    }
};
