const winston = require("winston");
require("express-async-errors");
module.exports = function () {

    winston.exceptions.handle(
        new winston.transports.File({ filename: './logfile/unhandledExceptions.log' }),
    );

    winston.add(new winston.transports.File({
        filename: './logfile/unhandledExceptions.log',
        handleRejections: true,
    }));
}