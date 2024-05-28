const otpGenerator = require("otp-generator");

const generateOtp = () => {
    return otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        specialChars: false,
        upperCase: false,
    });
};

const sendOtp = (phoneNumber, otp) => {
    console.log(`Sending ${otp} to the ${phoneNumber}.`);
};

module.exports = {
    sendOtp,
    generateOtp
};
