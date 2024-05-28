const { rawToJson } = require("../utils/common")
const database = require("../services/database")
const auth = require("../middleware/auth")
const permission = require("../middleware/permission")
const { sendOtp, generateOtp } = require("../services/otp")
const express = require("express")
const { validate } = require("../validators/verification-body")
const router = express.Router()

router.post("/verify", [auth], async (req, res) => {

    const body = req.body;

    const { error } = validate(body);
    if (error) return res.status(400).send(error.details[0].message);

    let data = await database.verifyOtp(body.aadhaar_number, body.otp);
    if (!data.length) return res.status(400).send("Invalid OTP");

    res.status(200).send("Valid OTP");

});

router.post('/request', [auth], async (req, res) => {
    const aadhaarNumber = req.body.aadhaar_number;
    const queryResult = await database.findById(
        "aadhaar_info",
        "aadhaar_number",
        aadhaarNumber
    );

    const data = rawToJson(queryResult)
    if (!data.length)
        return res.status(404).send("Aadhaar info not found with given id.")

    const otp = generateOtp();

    database.insert("otp", { aadhaar_number: aadhaarNumber, otp })
    sendOtp(data[0].phone_number, otp);

    res.send("Otp send to the given phone number.");


});

module.exports = router
