const jwt = require("jsonwebtoken");

function generateAuthToken(data){
    const token = jwt.sign(data, "jwtPrivateKey");
    return token;
}

module.exports = { generateAuthToken };