const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function generateAuthToken(data) {
    const token = jwt.sign(data, "jwtPrivateKey");
    return token;
}

async function comparePassword(plainPassword, cipherPassword) {
    return await bcrypt.compare(plainPassword, cipherPassword);
}

async function generatePassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
}

module.exports = {
    generateAuthToken,
    generatePassword,
    comparePassword,
};