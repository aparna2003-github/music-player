// controllers/musicController.js

// This function sends a simple JSON response with a message.
const getMusicList = (req, res) => {
  res.json({ message: 'This is the music list' });
};

module.exports = { getMusicList };  // Export the function
