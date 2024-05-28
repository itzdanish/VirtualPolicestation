const logger = require("../services/logger");
const { InternalServer } = require("../utils/error");

module.exports = function error(err, req, res, next) {
        const error = err.status ? err : new InternalServer("Something wrong.");
        logger.error('error', err);

        res.status(error.status || 500).send(error);
}