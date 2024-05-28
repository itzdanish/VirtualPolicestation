var otpGenerator = require('otp-generator')


module.exports = function () {
    return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
}