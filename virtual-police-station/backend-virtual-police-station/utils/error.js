const statusCode = require("./status-code");

class CustomError extends Error {

  constructor(name, statusCode, description, others) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.status = statusCode;
    this.description = description;
    this.others = others

    Error.captureStackTrace(this);
  }
}

class BadRequest extends CustomError {
  constructor(description = 'Bad Request.', others = undefined) {
    super('BAD REQUEST', statusCode.BAD_REQUEST, description, others);
  }
}

class Unauthorized extends CustomError {
  constructor(description = 'Unauthorized.', others = undefined) {
    super('UNAUTHORIZED', statusCode.UNAUTHORIZED, description, others);
  }
}

class Forbidden extends CustomError {
  constructor(description = 'Forbidden.', others = undefined) {
    super('FORBIDDEN', statusCode.FORBIDDEN, description, others);
  }
}

class NotFound extends CustomError {
  constructor(description = 'Not Found.', others = undefined) {
    super('NOT FOUND', statusCode.NOT_FOUND, description, others);
  }
}

class InternalServer extends CustomError {
  constructor(description = 'Internal Server Error.', others = undefined) {
    super('INTERNAL SERVER ERROR', statusCode.INTERNAL_SERVER, description, others);
  }
}

class ServiceUnavailable extends CustomError {
  constructor(description = 'Service Unavailable.', others = undefined) {
    super('SERVICE UNAVAILABLE', statusCode.SERVICEUNAVAILABLE, description, others);
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServer,
  ServiceUnavailable

}
