const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authorize = require('../middlewares/authorize');

// Add item to cart
router.post('/add',authorize, favoriteController.addToFav);

// Get all items for a user
router.get('/user/',authorize, favoriteController.getUserFav)

// Remove item
router.delete('/remove',authorize, favoriteController.removeFromFav);

module.exports = router;
