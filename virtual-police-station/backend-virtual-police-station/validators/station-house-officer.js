const Joi = require("joi");

function validateStationHouseOfficer(stationHouseOfficer, method) {
    const schemaForInsert = Joi.object({
        name: Joi.string().min(1).required(),
        date_of_birth: Joi.string().min(10).max(10).required(),
        gender: Joi.string().min(1).max(1).required(),
        address: Joi.string().min(3).required(),
        aadhaar_number: Joi.string().min(12).max(12).required(),
        phone_number: Joi.string().min(10).max(10).required(),
        password: Joi.string().min(5).required(),
    });

    const schemaForUpdate = Joi.object({
        name: Joi.string().min(1),
        date_of_birth: Joi.string().min(10).max(10),
        gender: Joi.string().min(1).max(1),
        address: Joi.string().min(3),
        aadhaar_number: Joi.string().min(12).max(12),
        phone_number: Joi.string().min(10).max(10),
        password: Joi.string().min(5)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(stationHouseOfficer) : schemaForUpdate.validate(stationHouseOfficer);
}

exports.validate = validateStationHouseOfficer;