const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String, // Cloudinary URL
});

const PlaylistSchema = new mongoose.Schema({
  weather: String, // e.g., "Sunny", "Rainy"
  songs: [SongSchema],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
