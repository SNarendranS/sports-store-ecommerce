import express from 'express';
const router = express.Router();
import {addToCart,removeFromCart,getUserCart,updateCartItem,findItemCart} from '../controllers/cartController.js';
import authorize  from '../middlewares/authorize.js';

// Add item to cart
router.post('/',authorize, addToCart);

// Get all items for a user
router.get('/',authorize, getUserCart);

// Update quantity
router.put('/',authorize, updateCartItem);

// Remove item
router.delete('/',authorize, removeFromCart);


router.get('/find/:productid',authorize, findItemCart);

export default router;
