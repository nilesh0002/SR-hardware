const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    register,
    login,
    getMe,
    updateProfile,
    changePassword,
    forgotPassword,
    logout
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router; 