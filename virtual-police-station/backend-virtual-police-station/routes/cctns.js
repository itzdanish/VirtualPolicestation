const express = require("express");
require("express-async-errors");
const { generatePassword } = require("../services/auth");
const { validate } = require("../validators/cctns");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "cctns";
const id = `username`;
const resourceName = "CCTNS user";

router.post('/', [validateBody(validate), auth], async (req, res) => {

    const primaryKey = ['username'];
    const stationHouseOfficer = req.body;

    stationHouseOfficer.password = await generatePassword(stationHouseOfficer.password);

    await handler.post(req, res, table, stationHouseOfficer, primaryKey, resourceName);
});


router.put(`/:${id}`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = req.params;
    const updates = req.body;
    if (updates.password) updates.password = await generatePassword(updates.password);
    await handler.put(req, res, table, primaryKey, updates, resourceName);
});


router.delete(`/:${id}`, [auth, permission], async (req, res) => {
    const primaryKey = req.params;
    await handler.delete(req, res, table, primaryKey, resourceName);
});


module.exports = router;
