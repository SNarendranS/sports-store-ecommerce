import express from 'express'
import { login, register, adminRegister, logout } from '../controllers/authController.js';
import authorizeMiddleware from '../middlewares/authorize.js';
const router = express.Router();

router.post('/register', register);
router.post('/admin/register', adminRegister);
router.post('/', login);
router.get('/', authorizeMiddleware, logout);

export default router;