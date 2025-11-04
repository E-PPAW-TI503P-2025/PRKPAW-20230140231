<<<<<<< HEAD
exports.addUserData = (req, res, next) => {
  console.log('Middleware: Menambahkan data user dummy...');
  req.user = {
    id: 123,
    nama: 'User Karyawan', 
    role: 'karyawan'
  };
  next(); 
};

 	
 	exports.isAdmin = (req, res, next) => {
 	  if (req.user && req.user.role === 'admin') {
 	    console.log('Middleware: Izin admin diberikan.');
 	    next(); 
 	  } else {
 	    console.log('Middleware: Gagal! Pengguna bukan admin.');
 	    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin'});
 	  }
 	};
=======
exports.addUserData = (req, res, next) => {
  console.log('Middleware: Menambahkan data user dummy...');
  req.user = {
    id: 123,
    nama: 'User Karyawan', 
    role: 'karyawan'
  };
  next(); 
};

 	
 	exports.isAdmin = (req, res, next) => {
 	  if (req.user && req.user.role === 'admin') {
 	    console.log('Middleware: Izin admin diberikan.');
 	    next(); 
 	  } else {
 	    console.log('Middleware: Gagal! Pengguna bukan admin.');
 	    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin'});
 	  }
 	};
>>>>>>> 6c72c23d80c0df10ba53ea4e5a1bc3ef43760673
