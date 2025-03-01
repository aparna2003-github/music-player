const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
