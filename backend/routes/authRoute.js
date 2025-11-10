const express = require('express');
const { login, register, adminRegister } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/admin/register', adminRegister);
router.post('/', login);

module.exports = router;
