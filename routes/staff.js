const staffController = require('../controllers/staffController');
const express = require('express');

const router = express.Router();
 
router.post('/transferStaff', staffController.transferStaff);

module.exports = router;