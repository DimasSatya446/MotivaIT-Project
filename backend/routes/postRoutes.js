const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Error" });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Tidak boleh edit" });

  Object.assign(post, req.body);
  await post.save();

  res.json(post);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Tidak boleh hapus" });

  await post.deleteOne();
  res.json({ message: "Berhasil dihapus" });
});

module.exports = router;
