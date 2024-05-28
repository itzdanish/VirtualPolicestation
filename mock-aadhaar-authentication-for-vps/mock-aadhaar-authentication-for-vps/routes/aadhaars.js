const database = require("../services/database");
const { rawToJson } = require("../utils/common")
const { validate } = require("../validators/aadhaar");
const permission = require("../middleware/permission");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const moment = require('moment');
router.get('/', [auth, permission.checkGet], async (req, res) => {
    const queryResult = await database.find("aadhaar_info");
    const data = rawToJson(queryResult);
    res.send(data);
});


router.get('/:id', [auth, permission.checkGet], async (req, res) => {
    const aadhaarNumber = req.params.id;
    const queryResult = await database.findById("aadhaar_info", "aadhaar_number", aadhaarNumber);

    const data = rawToJson(queryResult);

    const dob = moment(new Date(data[0].dob)).format('L');
    data[0].dob = dob;

    if (!data.length) return res.status(404).send("Aadhaar info not found with given id.");
    else res.send(data);

});


router.post('/', [auth, permission.checkPost], async (req, res) => {
    const newAadhaar = req.body;

    const { error } = validate(newAadhaar, "POST");
    if (error) return res.status(400).send(error.details[0].message);

    let aadhaar = await database.findById("aadhaar_info", "aadhaar_number", newAadhaar.aadhaar_number);
    if (aadhaar.length) return res.status(400).send('Aadhaar already registered.');

    const queryResult = await database.insert("aadhaar_info", newAadhaar);

    res.status(200).send("Aadhar registration successfully");

});


router.put('/:id', [auth, permission.checkPut], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let aadhaar = await database.findById("aadhaar_info", "aadhaar_number", req.params.id);
    if (!aadhaar.length) return res.status(404).send('Aadhaar with the given id is not found.');

    const queryResult = await database.update("aadhaar_info", req.body, "aadhaar_number", req.params.id);

    res.status(200).send("Aadhaar updated successfully.");

});

router.delete('/:id', [auth, permission.checkDelete], async (req, res) => {
    let aadhaar = await database.findById("aadhaar_info", "aadhaar_number", req.params.id);
    if (!aadhaar.length) return res.status(404).send('Aadhaar with the given id is not found.');

    const queryResult = await database.remove("aadhaar_info", "aadhaar_number", req.params.id);

    res.send("Record deleted succesfully");
});


module.exports = router;
