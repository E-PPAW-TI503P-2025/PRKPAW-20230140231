import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import Presensi from "./components/PresensiPage"; 
import ReportPage from "./components/ReportPage";         
import AttendancePage from "./components/PresensiPage";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar simple */}
        <nav className="bg-gray-100 p-4 flex gap-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          {/* opsional: link langsung */}
          <Link to="/presensi" className="text-blue-600 hover:underline">
            Presensi
          </Link>
          <Link to="/report" className="text-blue-600 hover:underline">
            Report
          </Link>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/presensi" element={<AttendancePage/>} />  {/* ✅ */}
          <Route path="/report" element={<ReportPage />} />         {/* ✅ */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
