import express from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getAllOfferProducts, getAllProductsCategories, availableStock } from '../controllers/productController.js';

const router = express.Router();

// Optional: if you have an authorization middleware
import authorize from '../middlewares/authorize.js';

// CRUD routes
router.post('/', authorize, createProduct);
router.get('/', getAllProducts);
router.get('/offers', getAllOfferProducts);
router.get('/category', getAllProductsCategories);
router.post('/stock', availableStock);
router.get('/:id', getProductById);
router.put('/:id', authorize, updateProduct);
router.delete('/:id', authorize, deleteProduct);

export default router;
