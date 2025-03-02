const Playlist = require("../models/playlist");
const cloudinary = require("../config/cloudinary");

exports.getPlaylistByWeather = async (req, res) => {
  try {
    const { weather } = req.params;
    const playlist = await Playlist.findOne({ weather });

    if (!playlist) return res.status(404).json({ message: "No playlist found for this weather." });

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
};

exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, weather } = req.body;
    const songUrl = req.file.path; // Cloudinary URL

    let playlist = await Playlist.findOne({ weather });

    if (!playlist) {
      playlist = new Playlist({ weather, songs: [] });
    }

    playlist.songs.push({ title, artist, url: songUrl });
    await playlist.save();

    res.json({ message: "Song uploaded successfully", song: { title, artist, url: songUrl } });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload song" });
  }
};
