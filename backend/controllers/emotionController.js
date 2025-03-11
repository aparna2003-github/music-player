// Detect Emotion from Python
const { exec } = require("child_process");
const Music = require("../models/songs");  // Ensure correct import

// Detect Emotion from Python
exports.detectEmotion = async (req, res) => {
    try {
        console.log("📸 Running Face Detection...");

        exec("python facedetection.py", (error, stdout, stderr) => {
            stdout = stdout.trim();
            stderr = stderr.trim();

            if (stderr) console.warn("⚠️ Python Warning:", stderr);

            if (error) {
                console.error("❌ Exec Error:", error);
                return res.status(500).json({ error: "Face detection failed.", details: error.message });
            }

            try {
                console.log("📤 Raw Python Output:", stdout); // Debugging

                const result = JSON.parse(stdout);  // Parse Python JSON output

                if (result.error) {
                    return res.status(500).json({ error: result.error });
                }

                console.log("🎵 Detected Emotion in Node.js:", result.emotion);
                return res.json({ emotion: result.emotion });  // Ensure the frontend gets the response
            } catch (parseError) {
                console.error("❌ JSON Parse Error:", parseError);
                return res.status(500).json({ error: "Failed to parse emotion data." });
            }
        });

    } catch (err) {
        console.error("❌ Server error in detecting emotion:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Fetch Music Based on Detected Emotion
exports.getMusicByEmotion = async (req, res) => {
    try {
        const { emotion } = req.params;
        console.log(`🔍 Fetching songs for emotion: ${emotion}`);

        if (!emotion) {
            return res.status(400).json({ message: "Emotion is required." });
        }

        const songs = await Music.find({ emotion: emotion.toLowerCase() });

        if (!songs.length) {
            console.warn(`⚠️ No songs found for emotion: ${emotion}`);
            return res.status(404).json({ message: "No songs found for this emotion." });
        }

        res.json(songs);
    } catch (error) {
        console.error("❌ Error fetching music:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};