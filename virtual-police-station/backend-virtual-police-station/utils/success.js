const statusCode = require("./status-code");

class OK {
    constructor(description = "Your request has been processed successfully.", others = undefined) {
        this.name = "OK";
        this.status = statusCode.OK;
        this.description = description;
        this.others = others;
    }
}

class Created {
    constructor(description = "Your request has been created successfully.", others = undefined) {
        this.name = "CREATED";
        this.status = statusCode.CREATED;
        this.description = description;
        this.others = others;
    }
}

module.exports = {
    OK,
    Created
}