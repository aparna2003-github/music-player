const axios = require("axios");

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_API = "http://ws.audioscrobbler.com/2.0/";

exports.getMusicByWeather = async (req, res) => {
    const { weather } = req.params; // Example: 'rainy', 'sunny', 'cloudy'
    console.log("Using LastFM API Key:", LASTFM_API_KEY);
console.log("Fetching music for weather:", weather);

    
    try {
        const response = await axios.get(`${LASTFM_API}?method=tag.gettoptracks&tag=${weather}&api_key=${LASTFM_API_KEY}&format=json`);
        const tracks = response.data.tracks.track;
        
        if (!tracks || tracks.length === 0) {
            return res.status(404).json({ message: "No music found for this weather." });
        }

        res.json(tracks);
    } catch (error) {
        console.error("Error fetching Last.fm music:", error);
        res.status(500).json({ message: "Failed to fetch music data." });
    }
};
