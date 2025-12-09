const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const { addUserData } = require("../middleware/permissionMiddleware");
const { body, validationResult } = require("express-validator");

// Middleware untuk isi req.user dari token (JWT kamu sendiri)
router.use(addUserData);

// Middleware cek hasil validasi
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.length) return next();

  return res.status(400).json({
    message: "Data yang dikirim tidak valid.",
    errors: errors.array(),
  });
};

// =========================
// ROUTES PRESENSI (SESUIAI MODUL)
// =========================

// CHECK-IN  -> POST /api/presensi/check-in
router.post(
  "/check-in",
  [
    body("latitude")
      .notEmpty().withMessage("latitude wajib diisi")
      .isFloat().withMessage("latitude harus berupa angka"),
    body("longitude")
      .notEmpty().withMessage("longitude wajib diisi")
      .isFloat().withMessage("longitude harus berupa angka"),
  ],
  validateRequest,
  presensiController.CheckIn
);

// CHECK-OUT -> POST /api/presensi/check-out
router.post("/check-out", presensiController.CheckOut);

module.exports = router;
