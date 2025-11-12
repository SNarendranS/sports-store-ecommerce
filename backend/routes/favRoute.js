import express from 'express';
const router = express.Router();
import {addToFav,removeFromFav,getUserFav} from '../controllers/favoriteController.js';
import authorize from '../middlewares/authorize.js';

// Add item to cart
router.post('/add', authorize, addToFav);

// Get all items for a user
router.get('/user/', authorize, getUserFav)

// Remove item
router.delete('/remove', authorize, removeFromFav);

export default router;
