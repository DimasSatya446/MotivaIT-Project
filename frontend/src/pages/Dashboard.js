import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch {
      setError("Gagal mengambil data. Pastikan backend berjalan.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus postingan ini?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch {
      setError("Gagal menghapus data.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#050a17] to-black text-white">
      <Navbar />

      {/* CONTENT WRAPPER WITH SPACING FOR FIXED NAVBAR */}
      <div className="max-w-6xl mx-auto pt-28 px-6 pb-10">
        <h2 className="text-3xl font-semibold mb-6">Dashboard Motivasi Mahasiswa</h2>

        <button
          onClick={() => navigate("/add")}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
        >
          + Tambah Motivasi
        </button>

        {error && <div className="text-red-400 mt-2">{error}</div>}

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {posts.map((post) => (
            <div
              key={post._id}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
            >
              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
              <p className="text-sm opacity-70 mb-3">Kategori: {post.category}</p>

              {/* IMAGE */}
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt=""
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
              )}

              {/* CONTENT */}
              <p className="mb-4">{post.content}</p>

              {/* SMART MUSIC PLAYER */}
              {post.songUrl && (
                <div className="mb-4">
                  <p className="text-sm opacity-80 mb-2">🎵 Pemutar Lagu:</p>

                  {/* === SPOTIFY === */}
                  {post.songUrl.includes("spotify.com") && (
                    <iframe
                      src={`https://open.spotify.com/embed/${post.songUrl.split("spotify.com/")[1]}`}
                      width="100%"
                      height="152"
                      allow="encrypted-media"
                      className="rounded-xl"
                      loading="lazy"
                    ></iframe>
                  )}

                  {/* === YOUTUBE === */}
                  {(post.songUrl.includes("youtube.com") ||
                    post.songUrl.includes("youtu.be")) && (
                    <iframe
                      className="rounded-xl w-full"
                      height="200"
                      src={`https://www.youtube.com/embed/${
                        post.songUrl.includes("youtu.be")
                          ? post.songUrl.split("youtu.be/")[1]
                          : post.songUrl.split("v=")[1]
                      }`}
                      title="YouTube player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  {/* === DIRECT AUDIO FILE === */}
                  {(post.songUrl.endsWith(".mp3") ||
                    post.songUrl.endsWith(".wav") ||
                    post.songUrl.endsWith(".ogg")) && (
                    <audio
                      controls
                      className="w-full rounded-xl mt-1"
                      src={post.songUrl}
                    ></audio>
                  )}

                  {/* === FALLBACK (LINK BIASA) === */}
                  {!post.songUrl.includes("spotify.com") &&
                    !post.songUrl.includes("youtube.com") &&
                    !post.songUrl.includes("youtu.be") &&
                    !post.songUrl.match(/\.(mp3|wav|ogg)$/) && (
                      <a
                        href={post.songUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-300"
                      >
                        Buka Link Musik
                      </a>
                    )}
                </div>
              )}

              {/* BUTTONS */}
              {post.createdBy?._id === userId && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
