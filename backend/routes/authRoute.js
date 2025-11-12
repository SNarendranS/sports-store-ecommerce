import express from 'express'
import  {login, register, adminRegister}  from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/admin/register', adminRegister);
router.post('/', login);

export default router;
