const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/image', auth, upload.single('image'), (req, res) => {
  res.json({
    message: "Upload berhasil",
    imageUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
