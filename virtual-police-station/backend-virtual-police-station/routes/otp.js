const express = require("express");
const Joi = require("joi");
require("express-async-errors");
const _ = require("lodash");
const database = require('../services/database');
const validateBody = require("../middleware/validate-body");
const { Created } = require("../utils/success");
const generateOTP = require("../utils/otp");
const send = require("../services/messaging");
const { default: axios } = require("axios");
const { BadRequest } = require("../utils/error");
const router = express.Router();
const config = require('config');
require("dotenv").config();
const aadhaarAuthToken = process.env.aadhaar_authentication_token;
const apiClient = axios.create({
    baseURL: config.get('aadhaar_authentication.baseUrl')
})


router.post('/', [validateBody(validate)], async (req, res) => {
    const { phone_number, aadhaar_number } = req.body;
    if (phone_number) {
        const otp = generateOTP();
        await database.insert("otp", { phone_number, otp });
        send(phone_number, otp);
        return res.status(201).send(new Created("otp sent to the given number"));
    }
    try {
        await apiClient.post(`/otp/request`, { aadhaar_number }, { headers: { 'x-auth-token': aadhaarAuthToken } });
        res.send(new Created("otp sent to the given number"));
    } catch (error) {
        const { response } = error;
        const msg = response ? response.data : "requested server down.";
        res.status(400).send(new BadRequest(msg));
    }
});

function validate(req) {
    const schema = Joi.object({
        aadhaar_number: Joi.string().min(12).max(12),
        phone_number: Joi.string().min(10).max(10)
    }).min(1);
    return schema.validate(req);
}


module.exports = router;