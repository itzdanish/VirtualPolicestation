const Joi = require("joi");

function validateVerificationBody(body) {
    const schema = Joi.object({
        aadhaar_number: Joi.string().min(12).max(12).required(),
        otp: Joi.string().min(6).required(),
    });

    return schema.validate(body);
}

exports.validate = validateVerificationBody;