// Import the necessary modules
const express = require('express');
const reportsController = require('../controllers/reportsController');

// Create a new router instance
const router = express.Router();

router.get('/modulesPerformance', reportsController.generateModulesPerformance);

router.get('/calculateStudentsGPA', reportsController.calculateStudentsGPA);

router.get('/modulesAttendance', reportsController.generateModulesAttendance);

// Export the router
module.exports = router;
