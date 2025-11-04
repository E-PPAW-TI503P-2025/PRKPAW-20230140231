<<<<<<< HEAD
const presensiRecords = require("../data/presensiData");
exports.getDailyReport = (req, res) => {
  console.log("Controller: Mengambil data laporan harian dari array...");
  res.json({
    reportDate: new Date().toLocaleDateString(),
    data: presensiRecords,
  });
};
=======
const presensiRecords = require("../data/presensiData");
exports.getDailyReport = (req, res) => {
  console.log("Controller: Mengambil data laporan harian dari array...");
  res.json({
    reportDate: new Date().toLocaleDateString(),
    data: presensiRecords,
  });
};
>>>>>>> 6c72c23d80c0df10ba53ea4e5a1bc3ef43760673
