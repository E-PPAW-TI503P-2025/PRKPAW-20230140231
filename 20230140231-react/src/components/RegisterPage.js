import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportPage() {
  const [data, setData] = useState([]);
  const [nama, setNama] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const params = {};
      if (nama) params.nama = nama;
      if (tanggalMulai) params.tanggalMulai = tanggalMulai;
      if (tanggalSelesai) params.tanggalSelesai = tanggalSelesai;

      const res = await axios.get("http://localhost:3001/api/reports/daily", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengambil data report presensi"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Laporan Presensi
        </h2>

        {/* Filter */}
        <div className="bg-white p-4 rounded-md shadow mb-4">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Filter nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <input
              type="date"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <button
              onClick={fetchReport}
              className="bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700"
            >
              Tampilkan
            </button>
          </div>
        </div>

        {loading && <p className="text-center">Memuat data...</p>}
        {error && (
          <p className="text-center text-red-600 mb-2">
            {error}
          </p>
        )}

        {/* Tabel report */}
        <div className="bg-white rounded-md shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-2 text-left">No</th>
                <th className="px-3 py-2 text-left">Nama User</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Check-In</th>
                <th className="px-3 py-2 text-left">Check-Out</th>
                <th className="px-3 py-2 text-left">Latitude</th>
                <th className="px-3 py-2 text-left">Longitude</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center px-3 py-4 text-gray-500"
                  >
                    Belum ada data presensi.
                  </td>
                </tr>
              )}

              {data.map((row, idx) => (
                <tr key={row.id} className="border-t">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{row.user?.nama}</td>
                  <td className="px-3 py-2">{row.user?.email}</td>
                  <td className="px-3 py-2">
                    {row.checkIn
                      ? new Date(row.checkIn).toLocaleString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-3 py-2">
                    {row.checkOut
                      ? new Date(row.checkOut).toLocaleString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-3 py-2">{row.latitude ?? "-"}</td>
                  <td className="px-3 py-2">{row.longitude ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
