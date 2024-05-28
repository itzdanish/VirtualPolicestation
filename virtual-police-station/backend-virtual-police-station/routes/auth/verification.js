const express = require("express");
const Joi = require("joi");
require("express-async-errors");
const _ = require("lodash");
const database = require('../../services/database');
const { generateAuthToken } = require("../../services/auth");
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
const validateBody = require("../../middleware/validate-body");
const { NotFound, BadRequest } = require("../../utils/error");
const { default: axios } = require("axios");
const router = express.Router();

const aadhaarAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoiTmVoYSIsImlzX3ZlcmlmaWVkIjoxLCJoaXQiOjMwLCJwZXJtaXNzaW9uX3N0cmluZyI6InIiLCJpYXQiOjE2MTU3MDQyNTJ9.Qno3jz0NIbKN2_9TQaIWr8BnIXLZVOebn-13qJFriII';
const apiClient = axios.create({
    baseURL: `http://localhost:8000/api`
})

router.post('/', [validateBody(validate), auth, permission], async (req, res) => {
    const { phone_number, aadhaar_number, otp } = req.body;
    if (phone_number) {
        const data = await database.findById("otp", { phone_number, otp });
        if (!data.length) return res.status(400).send(new BadRequest("OTP is not valid."));
        console.log("Delete the otp from database");

        let users = await database.findById("user", { phone_number });
        if (!users.length) {
            const verifcation = { phone_number, 'verified': true };
            const token = generateAuthToken(verifcation);
            return res.send({ is_register: false, token });
        }
        const user = _.omit(users[0], ['password']);
        const token = generateAuthToken(user);
        return res.send({ is_register: true, token })
    }
    try {
        const result = await apiClient.post(`/otp/verify`, { aadhaar_number, otp }, { headers: { 'x-auth-token': aadhaarAuthToken } });
        if (result.data == "Valid OTP"); {
            let users = await database.findById("user", { aadhaar_number });
            if (!users.length) {
                const { data } = await apiClient.get(`/aadhaars/${aadhaar_number}`, { headers: { 'x-auth-token': aadhaarAuthToken } });
                const verifcation = { aadhaar_number, 'verified': true };
                const token = generateAuthToken(verifcation);
                return res.send({ is_register: false, token, user: data[0] });
            }
            const user = _.omit(users[0], ['password']);
            const token = generateAuthToken(user);
            return res.send({ is_register: true, token })
        }
    } catch (error) {
        res.status(400).send(new BadRequest(error.response.data));
    }

});

function validate(req) {
    const schema = Joi.object({
        aadhaar_number: Joi.string().min(12).max(12),
        phone_number: Joi.string().min(10).max(10),
        otp: Joi.string().min(4).max(6).required(),
    }).min(2);
    return schema.validate(req);
}


module.exports = router;
