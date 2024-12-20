const express = require('express');
const { registerUser, loginUser } = require('../controllers/authControllers');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/register', upload.single("photo"), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User data', user: req.user });
});

module.exports = router;
