const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getAllOfferProducts, getAllProductsCategories } = require('../controllers/productController');

// Optional: if you have an authorization middleware
const authorize = require('../middlewares/authorize');

// CRUD routes
router.post('/', authorize, createProduct);
router.get('/', getAllProducts);
router.get('/offers', getAllOfferProducts);
router.get('/category', getAllProductsCategories);

router.get('/:id', getProductById);
router.put('/:id', authorize, updateProduct);
router.delete('/:id', authorize, deleteProduct);

module.exports = router;
