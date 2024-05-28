const express = require("express");
require("express-async-errors");
const { generatePassword } = require("../services/auth");
const { validate } = require("../validators/station-house-officer");
const auth = require("../middleware/auth");
const database = require("../services/database");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "station_house_officer";
const id = `aadhaar_number`;
const resourceName = "Station House Officer";

router.get('/', [auth], async (req, res) => {
    const stationHouseOfficers = await database.find(table);
    res.send(stationHouseOfficers);
});


router.get(`/:${id}`, [auth], async (req, res) => {
    const primaryKey = req.params;

    await handler.get(req, res, table, primaryKey, resourceName);
});

router.post('/', [validateBody(validate), auth], async (req, res) => {
    const primaryKey = ['aadhaar_number'];
    const stationHouseOfficer = req.body
    stationHouseOfficer.password = await generatePassword(stationHouseOfficer.password);

    await handler.post(req, res, table, stationHouseOfficer, primaryKey, resourceName);
});


router.put(`/:${id}`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = req.params;
    const updates = req.body;
    if (updates.password) updates.password = await generatePassword(updates.password);

    await handler.put(req, res, table, primaryKey, updates, resourceName);
});


router.delete(`/:${id}`, [auth], async (req, res) => {
    const primaryKey = req.params;

    await handler.delete(req, res, table, primaryKey, resourceName);
});


module.exports = router;
