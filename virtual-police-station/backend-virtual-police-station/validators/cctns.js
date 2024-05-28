const Joi = require("joi");

function validateCCTNS(cctns, method) {
    const schemaForInsert = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
    });

    const schemaForUpdate = Joi.object({
        username: Joi.string().min(5),
        password: Joi.string().min(5),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(cctns) : schemaForUpdate.validate(cctns);
}

exports.validate = validateCCTNS;