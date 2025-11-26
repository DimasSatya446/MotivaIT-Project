import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h3
          className="text-xl font-semibold cursor-pointer text-white"
          onClick={() => navigate("/dashboard")}
        >
          Motivasi Mahasiswa
        </h3>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
