const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Cloudinary image URL
  weatherCondition: { type: String }, // Example: "Rainy", "Sunny" (Optional)
  emotion: { type: String }, // Example: "Happy", "Sad" (Optional)
  musicFile: { type: String, required: true }, // Cloudinary MP3 URL
});

module.exports = mongoose.model("Music", musicSchema);
