import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar"; 

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("lainnya");
  const [songUrl, setSongUrl] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      const d = res.data;

      setTitle(d.title);
      setContent(d.content);
      setCategory(d.category);
      setSongUrl(d.songUrl || "");
      setOldImage(d.image);
      setPreview("http://localhost:5000" + d.image);
    } catch {
      setError("Gagal mengambil data");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const uploadImage = async () => {
    if (!newImage) return oldImage;
    const f = new FormData();
    f.append("image", newImage);
    const res = await api.post("/upload/image", f, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return setError("Judul dan konten wajib diisi");

    try {
      setLoading(true);
      const finalImage = await uploadImage();

      await api.put(`/posts/${id}`, {
        title,
        content,
        category,
        songUrl,
        image: finalImage
      });

      navigate("/dashboard");
    } catch {
      setError("Gagal mengupdate data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] to-black text-white">
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-400/40 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-white/20"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-2 mb-3 rounded bg-white/20"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-white/20"
          >
            <option value="quote">Quote</option>
            <option value="tips">Tips</option>
            <option value="pengalaman">Pengalaman</option>
            <option value="lainnya">Lainnya</option>
          </select>

          <input
            type="text"
            value={songUrl}
            onChange={(e) => setSongUrl(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-white/20"
          />

          <input
            type="file"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="mb-3"
          />

          {preview && (
            <img
              src={preview}
              alt=""
              className="w-48 rounded-lg mb-4"
            />
          )}

          <button
            disabled={loading}
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold transition"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
