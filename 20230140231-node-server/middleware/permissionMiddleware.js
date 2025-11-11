const addUserData = (req, res, next) => {
  req.user = {
    id: 1,
    nama: "User Demo",
    role: "admin"
  };
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Akses ditolak. Hanya admin yang boleh mengakses laporan harian."
  });
};

module.exports = { addUserData, isAdmin };
