// See https://expressjs.com/en/guide/routing.html for routing

const express = require('express');
const modulesController = require('../controllers/modulesController');

const router = express.Router();

router.post('/', modulesController.create);

router.get('/:code', modulesController.retrieveByCode);

router.delete('/:code', modulesController.deleteByCode);

router.put('/:code', modulesController.updateByCode);

router.get('/', modulesController.retrieveAll);

router.post('/table', modulesController.initTable);

module.exports = router;
