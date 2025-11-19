// src/components/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        nama,
        email,
        password,
        role,
      });

      setSuccess("Registrasi berhasil, silakan login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registrasi gagal, silakan cek kembali data yang kamu isi."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white border border-pink-100 rounded-2xl shadow-md w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
          Register ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-pink-400 text-white font-semibold rounded-lg shadow hover:bg-pink-500 transition"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-600 text-center">{success}</p>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
