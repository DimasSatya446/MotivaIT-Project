import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


const handleLogin = async (e) => {
e.preventDefault();
if (!email || !password) return setError("Email dan password wajib diisi");


try {
setLoading(true);
const res = await api.post("/auth/login", { email, password });
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
navigate("/dashboard");
} catch {
setError("Login gagal");
} finally {
setLoading(false);
}
};


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1e3f] via-black to-gray-700 p-6">
<div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
<h2 className="text-white text-3xl font-semibold mb-6 text-center">Login</h2>


{error && <div className="bg-red-400/40 text-white p-3 rounded mb-4 text-center">{error}</div>}


<form onSubmit={handleLogin} className="space-y-4">
<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none" />


<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none" />


<button disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{loading ? "Loading..." : "Login"}</button>
</form>


<p className="text-gray-300 mt-4 text-center">Belum punya akun? <span onClick={()=>navigate("/register")} className="text-blue-400 cursor-pointer">Register</span></p>
</div>
</div>
);
}