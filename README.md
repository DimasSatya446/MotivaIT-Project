# MotivaIT — Share Your Motivation, Boost Someone’s Day. ❤️‍🔥❤️‍🔥❤️‍🔥
Pernah merasa kehilangan motivasi saat melakukan sesuatu? <br>
atau kamu pernah ingin memberi sebuah semangat kepada seseorang tapi merasa malu? <br>
Tenang saja karena **MotivaIT** hadir untuk mengatasi hal tersebut. Merupakan web yang memungkinkan pengguna mengirimkan pesan semangat, motivasi, quotes, dan lainnya secara anonymous. Selain, itu pengguna juga dapat menyertakan lagu pada pesan mereka.

## 🎯 Penyelesaian Masalah 
MotivaIT hadir untuk mengatasi permasalahan berikut:
- Menjadi wadah bagi mahasiswa yang kurang berani dalam menyampaikan pesannya
- Meningkatkan kembali motivasi mahasiswa yang hilang
- Menjadi tempat bercerita dan berbagi bersama

## 🧩 Fitur utama
- Registrasi dan login: Menggunakan JWT dan bcrypt
- Motivation card: Dilengkapi dengan CRUD
- Upload gambar: Menggunakan Multer
- Musik: Embed Spotify/YouTube (iframe handler)

## ⚙️ Tech Stack
### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcrypt (hashing password)
- multer (untuk upload gambar)
### Frontend
- React.js
- Create React App (CRA)
- React Router DOM
- Axios
- Tailwind CSS
- PostCSS
- Autoprefixer
- HTML5 Audio Player
- JavaScript ES6+

## ⚡ Instalasi
### Backend
Pastikan untuk mengclone repo ini dengan ```git clone``` dan masuk ke folder backend
```
cd backend
```
Buat file ```.env``` dengan konfigurasi mongoDB
```
JWT_SECRET= {secret key} 
MONGO_URI=mongodb+srv://....
```
Lalu jalankan menggunakan
```
npm run dev
```
Note: gunakan ```npm install``` jika dependensi tidak muncul saat clone
### Frontend
Pastikan untuk mengclone repo ini dengan ```git clone``` dan masuk ke folder frontend
```
cd frontend
```
Jalankan frontend dengan
```
npm start
```
Note: gunakan ```npm install``` jika dependensi tidak muncul saat clone

## 🔗 Daftar API
### 🔐 AUTH
```POST /api/auth/register``` — registrasi pengguna <br>
```POST /api/auth/login``` — login (mengembalikan token JWT)

### 📝 POSTS
```POST /api/posts``` — membuat postingan baru (butuh token) <br>
```GET /api/posts``` — daftar semua postingan <br>
```GET /api/posts/:id``` — detail 1 postingan berdasarkan ID <br>
```PUT /api/posts/:id``` — edit postingan (butuh token; hanya pemilik) <br>
```DELETE /api/posts/:id``` — hapus postingan (butuh token; hanya pemilik)

### 🖼 UPLOAD
```POST /api/upload/image``` — upload gambar (multipart/form-data; field image)

---
🚀 Happy Vibe Coding! 🚀
