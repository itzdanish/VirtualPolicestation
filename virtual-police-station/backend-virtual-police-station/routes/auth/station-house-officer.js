const Joi = require('joi');
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const database = require("../../services/database");
const { generateAuthToken, comparePassword } = require("../../services/auth");
const validateBody = require("../../middleware/validate-body");
const error = require("../../utils/error");
const { BadRequest } = require('../../../../../../Users/intak/Desktop/Projects/node/api-attendance/utils/error');
const router = express.Router();


router.post('/', [validateBody(validate)], async (req, res) => {
    const { aadhaar_number, password } = req.body;
    let data = await database.findById("station_house_officer", { aadhaar_number });
    if (!data.length) return res.status(400).send(new BadRequest("Invalid email or password."));
    const validPassword = await comparePassword(password, data[0].password);
    if (!validPassword) return res.status(400).send(new BadRequest("Invalid email or password."));

    data = _.omit(data[0], ['password']);

    const token = generateAuthToken(data);
    res.status(200).send(token);

});


function validate(req) {
    const schema = Joi.object({
        aadhaar_number: Joi.string().min(12).max(12),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);
}


module.exports = router;