const express = require('express');
const router = express.Router();
const userAddressController = require('../controllers/userAddressController');
const authorizeMiddleware = require('../middlewares/authorize');

// POST /api/addresses → create new address
router.post('/', authorizeMiddleware, userAddressController.createAddress);

// GET /api/addresses/user/:userid → get all addresses for a user
router.get('/user/:userid', authorizeMiddleware, userAddressController.getUserAddresses);

// GET /api/addresses/:addressid → get specific address
router.get('/:addressid', authorizeMiddleware, userAddressController.getAddressById);

// PUT /api/addresses/:addressid → update specific address
router.put('/:addressid', authorizeMiddleware, userAddressController.updateAddress);

// DELETE /api/addresses/:addressid → delete specific address
router.delete('/:addressid', authorizeMiddleware, userAddressController.deleteAddress);

module.exports = router;
