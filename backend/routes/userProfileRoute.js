import express from 'express';
import { getUserProfile } from '../controllers/userProfileController.js';
import authorizeMiddleware from '../middlewares/authorize.js';
const router = express.Router();

router.get('/', authorizeMiddleware, getUserProfile);



export default router;
