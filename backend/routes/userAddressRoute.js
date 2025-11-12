import express from 'express';
import {createAddress,getAddressById,getUserAddresses,updateAddress,deleteAddress} from '../controllers/userAddressController.js';
import authorizeMiddleware from '../middlewares/authorize.js';
const router = express.Router();

// POST /api/addresses → create new address
router.post('/',authorizeMiddleware, createAddress);

// GET /api/addresses/user/:userid → get all addresses for a user
router.get('/', authorizeMiddleware, getUserAddresses);

// GET /api/addresses/:addressid → get specific address
router.get('/:addressid', authorizeMiddleware, getAddressById);

// PUT /api/addresses/:addressid → update specific address
router.put('/update/:addressid', authorizeMiddleware, updateAddress);

// DELETE /api/addresses/:addressid → delete specific address
router.delete('/:addressid', authorizeMiddleware, deleteAddress);

export default router;
