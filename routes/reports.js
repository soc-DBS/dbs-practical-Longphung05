// Import the necessary modules
const express = require('express');
const reportsModel = require('../models/reports');
// Create a new router instance
const router = express.Router();

router.get('/modulesPerformance', function(req, res) {
    const { code } = req.query;

    // Generate attendance using query parameters
    return reportsModel.generateModulesPerformance( code )
        .then(function(modulePerformance) {
            return res.json({ performance: modulePerformance })
        } )
        .catch(function(error){
            console.error(error);
            res.status(500).send('unknown error');
        });
});

router.get('/calculateStudentsGPA', function(req, res){

    return reportsModel.calculateStudentsGPA()
        .then(function(result){
            return res.json({ message: "Calculating students GPA" })
        } )
        .catch(function(error){
            console.error(error);
            res.status(500).send('unknown error');
        });
});


router.get('/modulesAttendance', function(req, res){

    return reportsModel.generateAttendance()
        .then(function(moduleAttendance){
            return res.json({ attendance: moduleAttendance })
        })
        .catch(function(error){
            console.error(error);
            res.status(500).send('unknown error');
        });
});


// Export the router
module.exports = router;
