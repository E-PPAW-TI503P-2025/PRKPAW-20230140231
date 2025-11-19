// src/components/DashboardPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-8 border border-pink-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-pink-600">
              Dashboard ✨
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Selamat datang kembali! Kamu berada di halaman Dashboard.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-pink-400 text-white text-sm font-semibold rounded-lg shadow hover:bg-pink-500 transition"
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-pink-100 border border-pink-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-pink-600 uppercase">
              Status
            </p>
            <p className="text-xl font-bold text-gray-700">Login Sukses</p>
            <p className="text-xs text-gray-600 mt-1">
              Token tersimpan di localStorage.
            </p>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Role
            </p>
            <p className="text-xl font-bold text-gray-700">Mahasiswa / Admin</p>
            <p className="text-xs text-gray-600 mt-1">
              Role ditentukan saat registrasi.
            </p>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-pink-500 uppercase">
              
            </p>
            <p className="text-xl font-bold text-gray-700">Laporan Admin</p>
            <p className="text-xs text-gray-600 mt-1">
              Laporan Admin
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Petunjuk Alur Aplikasi
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Buat akun di halaman Register.</li>
            <li>Login menggunakan email dan password yang sudah dibuat.</li>
            <li>Jika login berhasil, kamu akan masuk ke Dashboard.</li>
            <li>
              Klik tombol <b>Logout</b> untuk keluar dan kembali ke Login.
            </li>
          </ul>
        </div>

        {/* ✅ Tombol ke Presensi & Report */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/presensi")}
            className="flex-1 py-2 px-4 bg-blue-400 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-500 transition"
          >
            Halaman Presensi
          </button>
          <button
            onClick={() => navigate("/report")}
            className="flex-1 py-2 px-4 bg-purple-400 text-white text-sm font-semibold rounded-lg shadow hover:bg-purple-500 transition"
          >
            Halaman Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
