const Joi = require("joi");

function validateNote(note, method) {
    const schemaForInsert = Joi.object({
        fir_number: Joi.string().min(1).required(),
        note: Joi.string().min(1).required(),
    });

    const schemaForUpdate = Joi.object({
        note: Joi.string().min(1).required(),
    });

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(note) : schemaForUpdate.validate(note);
}

exports.validate = validateNote;