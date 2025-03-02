const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const weatherRoutes = require("./routes/weather");
const musicRoutes = require("./routes/music"); // ✅ Music Routes

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin: "http://127.0.0.1:5500", // Allow frontend origin
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/music", musicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Global Error Handler:", err);
    res.status(500).json({ 
        message: "Internal Server Error", 
        error: err.message || JSON.stringify(err, null, 2) 
    });
});
