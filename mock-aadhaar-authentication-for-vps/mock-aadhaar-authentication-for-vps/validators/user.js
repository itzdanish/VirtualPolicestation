const Joi = require("joi");

function validateUser(user, method) {
    const schemaForInsert = Joi.object({
        username : Joi.string().min(3).required(),
        password: Joi.string().min(5).required(),
        website : Joi.string().min(5).required()
    });

    const schemaForUpdate = Joi.object({
        password: Joi.string().min(5),
        website : Joi.string().min(5),
        is_verified : Joi.boolean(),
        role_id :  Joi.number()
    }).min(1);

    return method == "POST" ? schemaForInsert.validate(user) :  schemaForUpdate.validate(user);
}

exports.validate = validateUser;