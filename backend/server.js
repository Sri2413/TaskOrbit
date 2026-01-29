require("dotenv").config(); // MUST be at the very top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ---------- MIDDLEWARE ----------
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());

// ---------- ROUTES ----------
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

// ---------- DATABASE CONNECTION ----------
async function connectDB() {
  try {
    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected successfully");

    // ✅ START REMINDER CRON JOB ONLY AFTER DB CONNECTS
    require("./jobs/remainderJob");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
}

connectDB();

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
