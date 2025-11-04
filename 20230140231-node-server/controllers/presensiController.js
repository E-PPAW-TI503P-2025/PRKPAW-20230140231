<<<<<<< HEAD
 	// 1. Ganti sumber data dari array ke model Sequelize
 	const { Presensi } = require("../models");
 	const { format } = require("date-fns-tz");
 	const timeZone = "Asia/Jakarta";
 	
 	exports.CheckIn = async (req, res) => {
 	  // 2. Gunakan try...catch untuk error handling
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // 3. Ubah cara mencari data menggunakan 'findOne' dari Sequelize
 	    const existingRecord = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (existingRecord) {
 	      return res
 	        .status(400)
 	        .json({ message: "Anda sudah melakukan check-in hari ini." });
 	    }
 	
 	    // 4. Ubah cara membuat data baru menggunakan 'create' dari Sequelize
 	    const newRecord = await Presensi.create({
 	      userId: userId,
 	      nama: userName,
 	      checkIn: waktuSekarang,
 	    });
 	    
 	    const formattedData = {
 	        userId: newRecord.userId,
 	        nama: newRecord.nama,
 	        checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: null
 	    };
 	
 	    res.status(201).json({
 	      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};
 	
 	exports.CheckOut = async (req, res) => {
 	  // Gunakan try...catch
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // Cari data di database
 	    const recordToUpdate = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (!recordToUpdate) {
 	      return res.status(404).json({
 	        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
 	      });
 	    }
 	
 	    // 5. Update dan simpan perubahan ke database
 	    recordToUpdate.checkOut = waktuSekarang;
 	    await recordToUpdate.save();
 	
 	    const formattedData = {
 	        userId: recordToUpdate.userId,
 	        nama: recordToUpdate.nama,
 	        checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	    };
 	
 	    res.json({
 	      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};
=======
const presensiRecords = require("../data/presensiData");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

// Fungsi Check-In
exports.CheckIn = (req, res) => {
  const { id: userId, nama: userName } = req.user;
  const waktuSekarang = new Date();

  const existingRecord = presensiRecords.find(
    (record) => record.userId === userId && record.checkOut === null
  );

  if (existingRecord) {
    return res
      .status(400)
      .json({ message: "Anda sudah melakukan check-in hari ini." });
  }

  const newRecord = {
    userId,
    nama: userName,
    checkIn: waktuSekarang,
    checkOut: null,
  };

  presensiRecords.push(newRecord);

  const formattedData = {
    ...newRecord,
    checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
  };

  console.log(
    `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-in.`
  );

  res.status(201).json({
    message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
      waktuSekarang,
      "HH:mm:ss",
      { timeZone }
    )} WIB`,
    data: formattedData,
  });
};

// Fungsi Check-Out
exports.CheckOut = (req, res) => {
  const { id: userId, nama: userName } = req.user;
  const waktuSekarang = new Date();

  const recordToUpdate = presensiRecords.find(
    (record) => record.userId === userId && record.checkOut === null
  );

  if (!recordToUpdate) {
    return res.status(404).json({
      message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
    });
  }

  recordToUpdate.checkOut = waktuSekarang;

  const formattedData = {
    ...recordToUpdate,
    checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone,
    }),
    checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone,
    }),
  };

  console.log(
    `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-out.`
  );

  res.json({
    message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
      waktuSekarang,
      "HH:mm:ss",
      { timeZone }
    )} WIB`,
    data: formattedData,
  });
};
>>>>>>> 6c72c23d80c0df10ba53ea4e5a1bc3ef43760673
