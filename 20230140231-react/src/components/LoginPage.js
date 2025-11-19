// src/components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Login gagal, coba lagi."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="bg-white border border-blue-100 rounded-2xl shadow-md w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-600">
          Login 💫
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Masuk untuk melanjutkan ke Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-pink-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-400 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-pink-500 font-semibold hover:underline">
            Register dulu
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
