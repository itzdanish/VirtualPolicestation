const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports = function (req, res, next) {
  const env = process.env.NODE_ENV;
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}
