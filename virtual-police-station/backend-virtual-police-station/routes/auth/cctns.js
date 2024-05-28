const Joi = require('joi');
const express = require('express');
const _ = require("lodash");
const database = require("../../services/database");
const { generateAuthToken, comparePassword } = require("../../services/auth");
const validateBody = require("../../middleware/validate-body");
const error = require("../../utils/error");
const router = express.Router();


router.post('/', [validateBody(validate)], async (req, res) => {
    const { username, password } = req.body;
    let data = await database.findById("cctns", { username });
    if (!data.length) return res.status(400).send(new error.BadRequest("Invalid email or password."));
    const validPassword = await comparePassword(password, data[0].password);
    if (!validPassword) return res.status(400).send(new error.BadRequest("Invalid email or password."));

    data = _.omit(data[0], ['password']);

    const token = generateAuthToken(data);
    res.status(200).send(token);

});


function validate(req) {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(req);
}


module.exports = router;