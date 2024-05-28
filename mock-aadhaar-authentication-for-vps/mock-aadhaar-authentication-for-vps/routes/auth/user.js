const Joi = require('joi');
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const database = require("../../services/database");
const { rawToJson } = require('../../utils/common');
const { generateAuthToken } = require("../../services/auth");
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const queryResult1 = await database.findById("user", "username", req.body.username);

    console.log(queryResult1);

    let user = rawToJson(queryResult1);
    if (!user.length) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const queryResult2 = await database.getPermissionString(user[0], `user`);
    const data = rawToJson(queryResult2);
    user = { ...user[0], ...data[0] }
    user = _.pick(user, ['id', 'username', 'is_verified', 'hit', 'permission_string'])

    const token = generateAuthToken(user);
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);

}


module.exports = router;