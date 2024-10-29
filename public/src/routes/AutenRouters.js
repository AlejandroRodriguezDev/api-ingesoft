const express = require('express');
const AutenController = require('../controllers/AutenController');
const router = express.Router();

router.post('/login', AutenController.login);
router.post('/register', AutenController.register);


module.exports = router;
