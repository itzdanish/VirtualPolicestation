const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/suspect");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "suspect";
const resourceName = "Suspect";

router.get(`/`, async (req, res) => {
    const suspects = await database.find(table);
    res.send(suspects);
});

router.get(`/:fir_number`, async (req, res) => {
    const primaryKey = req.params;
    await handler.get(req, res, table, primaryKey, resourceName);
});

router.post('/', [validateBody(validate)], async (req, res) => {
    const primaryKey = ['id'];
    const suspect = req.body;
    suspect.id = null;
    await handler.post(req, res, table, suspect, primaryKey, resourceName);
});


router.put(`/:id`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = req.params;
    const updates = req.body;
    await handler.put(req, res, table, primaryKey, updates, resourceName);
});


router.delete(`/:id`, [auth], async (req, res) => {
    const primaryKey = req.params;
    await handler.delete(req, res, table, primaryKey, resourceName);
});


module.exports = router;
