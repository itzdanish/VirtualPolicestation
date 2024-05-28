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

    const queryResult1 = await database.findById("admin","id", req.body.id);

    let admin = rawToJson(queryResult1);
    if(!admin.length) return res.status(400).send('Invalid email or password.');
    
    const validPassword = await bcrypt.compare(req.body.password, admin[0].password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const queryResult2 = await database.getPermissionString(admin[0], `admin`);
    const data = rawToJson(queryResult2);
    admin = { ...admin[0], ...data[0]}
    admin = _.pick(admin, ['id', 'name', 'email','permission_string'])


    const token = generateAuthToken(admin);
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        id : Joi.string().required(),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);

}


module.exports = router; 