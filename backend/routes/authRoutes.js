const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email sudah dipakai" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hash
    });

    res.status(201).json({ message: "Registrasi berhasil", user });
  } catch (e) {
    res.status(500).json({ message: "Error server" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email atau password salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Email atau password salah" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login berhasil", token, user });
  } catch (e) {
    res.status(500).json({ message: "Error server" });
  }
});

module.exports = router;
