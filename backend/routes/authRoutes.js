const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserInfo);

module.exports = router;
