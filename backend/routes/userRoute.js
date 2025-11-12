import express from 'express';
import { getUser, getUserById, updateUser } from '../controllers/userController.js';
import authorizeMiddleware from '../middlewares/authorize.js';

const router = express.Router();

// Update user details (protected)
router.put('/update',authorizeMiddleware, updateUser);

// Get user by username (protected)
router.get('/email', authorizeMiddleware, getUser);

// Get user by ID
router.get('/:id', authorizeMiddleware, getUserById);


export default router;
