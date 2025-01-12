const express = require('express');
const router = express.Router()
const users = require ('../models/userModel')
const jwt = require ('jsonwebtoken')
const auth = require ('../middlewares/auth')
require('dotenv').config()

router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    const user = { id: users.length + 1, name, email, password };
    users.push(user);
    res.status(201).json({ message: 'User berhasil didaftarkan!', user });
  } catch (err) {
    console.error('Error in register route:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan saat mendaftarkan user!' });
  }
});


router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find((u) => u.email === email)
    if (!user) {
      return res.status(400).json({ msg: 'Email atau Password salah' })

    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY,{expiresIn:'1h'})
      res.json({ message : 'login berhasil', token })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat login' })
  }
})

router.delete = ('/:id', auth, (req, res) => {
  try {
    const [id] = req.params
    const user = users.findIndex((u) => u.id === parseInt(id))
    if (user === -1) {
      return res.status(404).json({ msg: 'User tidak ditemukan' })
    }
    users.splice(userIndex, 1)
    res.status(200).json({ message: 'User berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus user'})
  }
})
module.exports = router



