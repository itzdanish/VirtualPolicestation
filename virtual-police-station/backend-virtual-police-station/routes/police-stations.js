const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/police-station");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "police_station";
const id = "police_station_number";
const resourceName = "Police Station";

router.get('/', [auth, permission], async (req, res) => {
    const { latitude, longitude } = req.query;
    if (latitude && longitude) {
        const query = `SELECT *, ( 6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude ))) ) AS distance FROM police_station ORDER BY distance asc`;
        const policeStations = await database.execute(query);
        return res.send(policeStations);
    }
    const policeStations = await database.find(table);
    res.send(policeStations);
});


router.get(`/:${id}`, [auth], async (req, res) => {
    const primaryKey = req.params;
    await handler.get(req, res, table, primaryKey, resourceName);
});


router.post('/', [validateBody(validate), auth], async (req, res) => {
    const primaryKey = ['police_station_number'];
    const police_station = req.body;

    await handler.post(req, res, table, police_station, primaryKey, resourceName);
});

router.put(`/:${id}`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = req.params;
    const updates = req.body;

    await handler.put(req, res, table, primaryKey, updates, resourceName);
});

router.delete(`/:${id}`, [auth], async (req, res) => {
    const primaryKey = req.params;
    await handler.delete(req, res, table, primaryKey, resourceName);
});

module.exports = router;
