const logger = require("../services/logger");

module.exports = function error(err, req, res, next) {
        logger.error('error', err);  

        res.status(500).send("Somethig failed.");
}