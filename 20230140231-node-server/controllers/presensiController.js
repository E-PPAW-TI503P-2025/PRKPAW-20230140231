const { Presensi } = require("../models");
const { Op } = require("sequelize");

// =========================
// CHECK-IN (SESUIAI MODUL)
// =========================
exports.CheckIn = async (req, res) => {
  try {
    const { id: userId } = req.user;           // dari JWT
    const { latitude, longitude } = req.body;  // dari frontend
    const waktuSekarang = new Date();

    // validasi lokasi
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude dan longitude wajib dikirim saat check-in",
      });
    }

    // Cek apakah sudah check-in hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await Presensi.findOne({
      where: {
        userId,
        checkIn: {
          [Op.gte]: today,
        },
      },
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." });
    }

    // Simpan presensi + lokasi
    const newRecord = await Presensi.create({
      userId,
      checkIn: waktuSekarang,
      latitude,
      longitude,
    });

    res.status(201).json({
      message: "Check-in berhasil",
      data: newRecord,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// =========================
// CHECK-OUT (SESUIAI MODUL)
// =========================
exports.CheckOut = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const waktuSekarang = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recordToUpdate = await Presensi.findOne({
      where: {
        userId,
        checkIn: {
          [Op.gte]: today,
        },
        checkOut: null,
      },
    });

    if (!recordToUpdate) {
      return res.status(404).json({
        message: "Tidak ditemukan check-in aktif untuk Anda.",
      });
    }

    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    res.json({
      message: "Check-out berhasil",
      data: recordToUpdate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
