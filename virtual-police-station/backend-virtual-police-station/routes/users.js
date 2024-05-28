const express = require("express");
require("express-async-errors");
const _ = require("lodash");
const database = require('../services/database');
const { generatePassword, generateAuthToken } = require("../services/auth");
const { validate } = require("../validators/user");
const verify = require("../middleware/verify");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const { BadRequest } = require("../utils/error");
const router = express.Router();

const table = "user";

router.get('/', [auth], async (req, res) => {
    const users = await database.find(table);
    res.send(users);
});


router.get(`/:number`, async (req, res) => {
    const primaryKey = determinePrimaryKey(req.params.number);
    await handler.get(req, res, table, primaryKey);
});


router.post('/', [validateBody(validate), verify], async (req, res) => {
    let { phone_number } = req.user;
    const number = _.pick(req.user, phone_number ? ['phone_number'] : ['aadhaar_number']);
    let user = { ...req.body, ...number }

    const data = await database.findById(table, number);
    if (data.length) return res.status(400).send(new BadRequest("User already registred"));

    const { insertId } = await database.insert("user", user);
    user = { ...user, user_id: insertId };
    const token = { token: generateAuthToken(user) };
    res.send(token);
});

router.put(`/:number`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = determinePrimaryKey(req.params.number);
    const updates = req.body;
    if (updates.password) updates.password = await generatePassword(updates.password);
    await handler.put(req, res, table, primaryKey, updates);
});

router.delete(`/:number`, [auth, permission], async (req, res) => {
    const primaryKey = determinePrimaryKey(req.params.number);
    await handler.delete(req, res, table, primaryKey);
});



function determinePrimaryKey(number) {
    return number.length == 10 ? { phone_number: number } : { aadhaar_number: number };
}


module.exports = router;
