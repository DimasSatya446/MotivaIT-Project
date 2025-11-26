import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AddPost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("lainnya");
  const [songUrl, setSongUrl] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return "";

    const f = new FormData();
    f.append("image", image);

    const res = await api.post("/upload/image", f, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Judul dan konten wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const uploaded = image ? await uploadImage() : "";

      await api.post("/posts", {
        title,
        content,
        category,
        songUrl,
        image: uploaded
      });

      navigate("/dashboard");
    } catch {
      setError("Gagal menambahkan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1e3f] via-black to-gray-700 text-white p-6 pt-24">
      <Navbar />

      <div className="max-w-lg mx-auto mt-6 backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">

        <h2 className="text-3xl font-semibold mb-6 text-center">
          Tambah Motivasi
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-400/40 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg bg-white/20 placeholder-gray-300"
          />

          <textarea
            placeholder="Konten..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-3 mb-3 rounded-lg bg-white/20 placeholder-gray-300"
          ></textarea>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg bg-[#4A4B4E] text-white"
          >
            <option value="quote">Quote</option>
            <option value="tips">Tips</option>
            <option value="pengalaman">Pengalaman</option>
            <option value="lainnya">Lainnya</option>
          </select>

          <input
            type="text"
            placeholder="Link lagu (opsional)"
            value={songUrl}
            onChange={(e) => setSongUrl(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg bg-white/20 placeholder-gray-300"
          />

          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="mb-3"
          />

          {preview && (
            <img
              src={preview}
              alt=""
              className="w-48 mt-3 rounded-xl shadow-lg"
            />
          )}

          <button
            disabled={loading}
            className="w-full p-3 mt-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Mengirim..." : "Tambah"}
          </button>

        </form>
      </div>
    </div>
  );
}
