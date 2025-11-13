import express from 'express';
const router = express.Router();
import {addToFav,removeFromFav,getUserFav, findItemFav} from '../controllers/favoriteController.js';
import authorize from '../middlewares/authorize.js';

// Add item to cart
router.post('/', authorize, addToFav);

// Get all items for a user
router.get('/', authorize, getUserFav)

// Remove item
router.delete('/', authorize, removeFromFav);

router.get('/find/:productid',authorize, findItemFav);

export default router;
