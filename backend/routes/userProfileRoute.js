const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authorizeMiddleware = require('../middlewares/authorize');

router.get('/', authorizeMiddleware, userProfileController.getUserProfile);



module.exports = router;
