const { Presensi } = require("../models");
const { Op } = require("sequelize");

// GET /api/reports/daily?tanggalMulai=YYYY-MM-DD&tanggalSelesai=YYYY-MM-DD&nama=...
exports.getDailyReport = async (req, res) => {
  try {
    const { nama, tanggalMulai, tanggalSelesai } = req.query;

    console.log("Controller: Mengambil data laporan harian dari database...");

    const whereCondition = {};

    // Filter berdasarkan nama (jika dikirim)
    if (nama) {
      whereCondition.nama = { [Op.like]: `%${nama}%` };
    }

    // Filter berdasarkan rentang tanggal (jika dikirim)
    if (tanggalMulai && tanggalSelesai) {
      whereCondition.checkIn = {
        [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)],
      };
    }

    const data = await Presensi.findAll({ where: whereCondition });

    res.json({
      reportDate: new Date().toLocaleDateString(),
      data,
    });
  } catch (error) {
    console.error("Gagal mengambil laporan harian:", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil laporan harian",
      error: error.message,
    });
  }
};
