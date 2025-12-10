import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ICON GYJ (Go Youn-jung)
const gyj = new L.Icon({
  iconUrl:
    "https://www.gethucinema.com/wp-content/uploads/2024/08/Go-Youn-jung-13-7JRKNP6835.jpg",
  iconSize: [50, 50],    // besar icon (px)
  iconAnchor: [25, 50],  // titik "ujung bawah" icon
});

function AttendancePage() {
  // state untuk pesan sukses / error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // state untuk menyimpan koordinat lokasi user
  const [coords, setCoords] = useState(null); // { lat, lng }

  // ====== AMBIL LOKASI DARI BROWSER ======
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser tidak mendukung geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      (err) => {
        setError("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  };

  // ambil lokasi otomatis saat halaman dibuka
  useEffect(() => {
    getLocation();
  }, []);

  // ====== FUNGSI CHECK-IN ======
  const handleCheckIn = async () => {
    setMessage("");
    setError("");

    // pastikan lokasi sudah ada
    if (!coords) {
      setError("Lokasi belum didapatkan. Mohon izinkan akses lokasi.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/presensi/check-in",
        {
          latitude: coords.lat,
          longitude: coords.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Check-in berhasil");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal melakukan check-in");
    }
  };

  // ====== FUNGSI CHECK-OUT ======
  const handleCheckOut = async () => {
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/presensi/check-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Check-out berhasil");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal melakukan check-out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Lakukan Presensi
        </h2>

        {/* Pesan sukses / error */}
        {message && (
          <p className="text-green-600 mb-2 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

        {/* MAP OSM – hanya tampil kalau coords sudah ada */}
        {coords && (
          <div className="mb-6 rounded-lg overflow-hidden shadow">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={16}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Marker pakai icon GYJ, tanpa popup "Mark" */}
              <Marker position={[coords.lat, coords.lng]} icon={gyj} />
            </MapContainer>
          </div>
        )}

        {/* Tombol presensi */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <button
            onClick={getLocation}
            className="mb-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Ambil / Refresh Lokasi
          </button>

          <div className="flex space-x-4">
            <button
              onClick={handleCheckIn}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
            >
              Check-In
            </button>

            <button
              onClick={handleCheckOut}
              className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
            >
              Check-Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
