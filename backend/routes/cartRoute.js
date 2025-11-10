const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authorize = require('../middlewares/authorize');

// Add item to cart
router.post('/add',authorize, cartController.addToCart);

// Get all items for a user
router.get('/user/',authorize, cartController.getUserCart);

// Update quantity
router.put('/update',authorize, cartController.updateCartItem);

// Remove item
router.delete('/remove',authorize, cartController.removeFromCart);


router.get('/user/find',authorize, cartController.findItemCart);

module.exports = router;
