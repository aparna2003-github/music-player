// const mongoose = require("mongoose");

// const musicSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   thumbnail: { type: String, required: true }, // Cloudinary image URL
//   weatherCondition: { type: String, required: true }, // Example: "Rainy", "Sunny"
//   musicFile: { type: String, required: true }, // Cloudinary MP3 URL
// });

// module.exports = mongoose.model("Music", musicSchema);
const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Cloudinary image URL
  weatherCondition: { type: String, required: true }, // Example: "Rainy", "Sunny"
  emotion: { type: String, required: true }, // Example: "Happy", "Sad"
  musicFile: { type: String, required: true }, // Cloudinary MP3 URL
});

module.exports = mongoose.model("Music", musicSchema);

