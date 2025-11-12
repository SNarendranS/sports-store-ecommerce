import express from 'express';
const router = express.Router();
import {addToCart,removeFromCart,getUserCart,updateCartItem,findItemCart} from '../controllers/cartController.js';
import authorize  from '../middlewares/authorize.js';

// Add item to cart
router.post('/add',authorize, addToCart);

// Get all items for a user
router.get('/user/',authorize, getUserCart);

// Update quantity
router.put('/update',authorize, updateCartItem);

// Remove item
router.delete('/remove',authorize, removeFromCart);


router.get('/user/find/:productid',authorize, findItemCart);

export default router;
