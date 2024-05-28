const Joi = require("joi");

function validateAadhaar(aadhaar, method) {
    const schemaForInsert = Joi.object({
        name : Joi.string().min(3).required(),
        aadhaar_number: Joi.string().min(12).max(12).required(),
        dob : Joi.string().min(10).max(10).required(),
        address : Joi.string().min(5).required(),
        gender : Joi.string().min(4).max(11),
        phone_number : Joi.string().min(10).max(10).required()

    });

    const schemaForUpdate = Joi.object({
        name : Joi.string().min(3),
        aadhaar_number: Joi.string().min(12).max(12),
        dob : Joi.string().min(10).max(10),
        address : Joi.string().min(5),
        gender : Joi.string().min(4).max(11),
        phone_number : Joi.string().min(10).max(10)

    }).min(1);

    return method == "POST" ? schemaForInsert.validate(aadhaar) : schemaForUpdate.validate(aadhaar);
}

exports.validate = validateAadhaar;