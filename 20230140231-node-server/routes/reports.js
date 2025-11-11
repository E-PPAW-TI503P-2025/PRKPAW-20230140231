const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { addUserData, isAdmin } = require("../middleware/permissionMiddleware");

// GET /api/reports/daily
// Query optional:
//   ?nama=User
//   ?tanggalMulai=2025-11-01&tanggalSelesai=2025-11-10
router.get(
  "/daily",
  addUserData,   // middleware isi req.user
  isAdmin,       // middleware cek role admin
  reportController.getDailyReport
);

module.exports = router;
