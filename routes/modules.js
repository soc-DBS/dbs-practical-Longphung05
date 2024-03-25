// See https://expressjs.com/en/guide/routing.html for routing

const express = require('express');
const { EMPTY_RESULT_ERROR, UNIQUE_VIOLATION_ERROR, DUPLICATE_TABLE_ERROR } = require('../errors');
const modulesModel = require('../models/modules');

const router = express.Router();

router.post('/table', function (req, res) {
    return modulesModel
        .initTable()
        .then(function () {
            return res.status(200).json({ msg: "created!" });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof DUPLICATE_TABLE_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        });
});

router.post('/', function (req, res) {
    const code = req.body.code;
    const name = req.body.name;
    const credit = req.body.credit;

    return modulesModel
        .create(code, name, credit)
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof UNIQUE_VIOLATION_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        });
});

// This needs to be before GET /modules/:code
router.get('/bulk', function (req, res) {
    const codesCsv = req.query.codes; // query parameters are strings
    const codes = codesCsv.split(',');
    return modulesModel
        .retrieveBulk(codes)
        .then(function (result) {
            return res.json(result);
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        });
});

router.get('/:code', function (req, res) {
    const code = req.params.code;

    return modulesModel
        .retrieveByCode(code)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        });
});

router.delete('/:code', function (req, res) {
    // Delete module by Code
    const code = req.params.code;
    return modulesModel
        .deleteByCode(code)
        .then(function () {
            console.log("delete ok!");
            return res.status(200).json({ msg: "deleted!" });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                // return res.status(404).json({ error: error.message });
                return res.status(404).json({ error: "No such module!" });
            }
            return res.status(500).json({ error: error.message });
        });
});

router.put('/:code', function (req, res) {
    // You can decide where you want to put the Credit in the Request
    // Implement Update module by Code and the credit is in req.body
    const code = req.params.code;
    const credit = req.body.credit;
    return modulesModel
        .updateByCode(code, credit)
        .then(function () {
            console.log("update ok!");
            return res.status(200).json({ msg: "updated!" });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        });
});

router.get('/', function (req, res) {
    // get all modules
    return modulesModel
        .retrieveAll()
        .then(function (modules) {
            return res.json({ modules: modules });
        })
        .catch(function (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        });
});

module.exports = router;
