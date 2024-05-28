const Joi = require("joi");

function validatePoliceStation(policeStation, method) {
    const schemaForInsert = Joi.object({
        police_station_number : Joi.string().min(1).required(),
        station_house_officer: Joi.string().min(1).required(),
        name: Joi.string().min(1).required(),
        phone_number: Joi.string().min(10).max(10).required(),
        address: Joi.string().min(1).required(),
        latitude: Joi.string().min(1).required(),
        longitude: Joi.string().min(1).required(),
    });

    const schemaForUpdate = Joi.object({
        police_station_number : Joi.string().min(1),
        station_house_officer: Joi.string().min(1),
        name: Joi.string().min(1),
        phone_number: Joi.string().min(10).max(10),
        address: Joi.string().min(1),
        latitude: Joi.string().min(1),
        longitude: Joi.string().min(1),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(policeStation) : schemaForUpdate.validate(policeStation);
}


exports.validate = validatePoliceStation;