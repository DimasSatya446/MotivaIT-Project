import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setSuccess("Registrasi berhasil! Silakan login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e1e2f] p-4">
      <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Register Akun
        </h2>

        {error && (
          <div className="bg-red-400/40 text-white p-3 rounded mb-3">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-400/40 text-white p-3 rounded mb-3">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm">
          Sudah punya akun?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
