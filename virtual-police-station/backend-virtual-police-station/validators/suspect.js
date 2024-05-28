const Joi = require("joi");

function validateSuspect(suspect, method) {
    const schemaForInsert = Joi.object({
        fir_number: Joi.string().min(1).required(),
        name: Joi.string().min(1).required(),
        gender: Joi.string().min(1).max(1).required(),
        height: Joi.number().min(1).required(),
    });

    const schemaForUpdate = Joi.object({
        name: Joi.string().min(1),
        gender: Joi.number().min(1),
        height: Joi.string().min(1),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(suspect) : schemaForUpdate.validate(suspect);
}

exports.validate = validateSuspect;