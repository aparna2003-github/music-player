const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5000;

// Sample fallback MP3s (You can add your own links)
const fallbackSongs = {
  sunny: [
    { name: "Summer Vibes", artist: "DJ Sun", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  ],
  rainy: [
    { name: "Raindrops", artist: "Calm Mood", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  ],
  cloudy: [
    { name: "Cloudy Dreams", artist: "Sky Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ],
};

// API to fetch songs based on weather
app.get("/api/music/:weather", async (req, res) => {
    const { weather } = req.params;

    try {
        // 🔴 Replace this with your actual music API if needed
        const response = await axios.get("https://api.example.com/getSongs");  
        let songs = response.data;

        // ✅ Filter songs with valid MP3 URLs
        let validSongs = songs.filter(song => song.url && song.url.endsWith(".mp3"));

        // 🔥 If no valid MP3s, use fallback
        if (validSongs.length === 0) {
            console.warn("No valid MP3 found! Using fallback.");
            validSongs = fallbackSongs[weather] || fallbackSongs.sunny;
        }

        res.json(validSongs);
    } catch (error) {
        console.error("Error fetching music:", error);
        res.status(500).json({ message: "Error fetching music" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
