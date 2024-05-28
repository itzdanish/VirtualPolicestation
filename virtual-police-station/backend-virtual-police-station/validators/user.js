const Joi = require("joi");

function validateUser(user, method) {
    const schemaForInsert = Joi.object({
        user_name: Joi.string().min(1).required(),
        gender: Joi.string().min(1).required(),
        date_of_birth: Joi.string().min(10).max(10).required(),
        address: Joi.string().min(3).required(),
        aadhaar_number: Joi.string().min(12).allow('').required(),
    }).min(4);

    const schemaForUpdate = Joi.object({
        name: Joi.string().min(1),
        aadhaar_number: Joi.string().min(12).max(12),
        phone_number: Joi.string().min(10).max(10),
        gender: Joi.string().min(1).max(1),
        date_of_birth: Joi.string().min(10).max(10),
        address: Joi.string().min(3),
        password: Joi.string().min(5)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(user) : schemaForUpdate.validate(user);
}

exports.validate = validateUser;