const express = require("express");
const router = express.Router();
const presensiController = require("../controllers/presensiController");
const { addUserData } = require("../middleware/permissionMiddleware");

// Tambahan library validasi tanggal
const { body, validationResult } = require("express-validator");

// Middleware untuk menambahkan data user ke request
router.use(addUserData);

// Middleware untuk mengecek hasil validasi
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Data yang dikirim tidak valid.",
      errors: errors.array(),
    });
  }
  next();
};

// ---------------------------
// ROUTES PRESENSI
// ---------------------------

// Check-in dan Check-out
router.post("/check-in", presensiController.CheckIn);
router.post("/check-out", presensiController.CheckOut);

// UPDATE data presensi (PUT)
router.put(
  "/:id",
  [
    body("checkIn")
      .optional()
      .isISO8601()
      .withMessage("checkIn harus berupa tanggal yang valid (format ISO 8601)."),
    body("checkOut")
      .optional()
      .isISO8601()
      .withMessage("checkOut harus berupa tanggal yang valid (format ISO 8601)."),
  ],
  validateRequest,
  presensiController.updatePresensi
);

// DELETE data presensi
router.delete("/:id", presensiController.deletePresensi);

module.exports = router;
