const express = require('express');
const { getUser, getUserById, updateUser } = require('../controllers/userController');
const authorizeMiddleware = require('../middlewares/authorize');

const router = express.Router();

// Update user details (protected)
router.put('/update',authorizeMiddleware, updateUser);

// Get user by username (protected)
router.get('/email', authorizeMiddleware, getUser);

// Get user by ID
router.get('/:id', authorizeMiddleware, getUserById);


module.exports = router;
