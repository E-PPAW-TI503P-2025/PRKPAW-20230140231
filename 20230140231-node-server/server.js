const authRoutes = require("./routes/auth");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3001;

// Middleware umum
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);


// Import routes
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");
const bookRoutes = require("./routes/books"); // kalau nggak dipakai juga tidak apa-apa

// Pasang prefix route
app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/books", bookRoutes);

// Route cek server
app.get("/", (req, res) => {
  res.json({ message: "API Presensi PAW 2025 berjalan" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
