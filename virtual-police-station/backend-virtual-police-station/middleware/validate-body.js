const { BadRequest } = require("../utils/error")

module.exports = function (validate) {
    return function (req, res, next) {
        const { error } = validate(req.body, req.method);
        if (error) return res.status(400).send(new BadRequest(error.details[0].message));
        next()
    }
}