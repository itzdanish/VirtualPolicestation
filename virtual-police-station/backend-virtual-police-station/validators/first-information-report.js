const Joi = require("joi");

function validateFir(fir, method) {
    const schemaForInsert = Joi.object({
        police_station_number: Joi.string().min(1).required(),
        user_id: Joi.number().min(1).required(),
        place_of_crime: Joi.string().min(1).required(),
        time_of_crime: Joi.string().min(8).required(),
        description: Joi.string().min(5).required(),
    });

    const schemaForUpdate = Joi.object({
        status_id: Joi.number().min(1),
        police_station_number: Joi.string().min(1),
        place_of_crime: Joi.string().min(1),
        time_of_crime: Joi.string().min(8),
        description: Joi.string().min(5),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(fir) : schemaForUpdate.validate(fir);
}

exports.validate = validateFir;