const express = require('express');
const studentsController = require('../controllers/studentsController');

const router = express.Router();

router.get('/', studentsController.retrieveAll);

router.post('/enrolNewStudent', studentsController.enrolNewStudent);

module.exports = router;