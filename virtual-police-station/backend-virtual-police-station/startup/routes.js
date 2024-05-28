const express = require("express");
const authStationHouseOfficer = require("../routes/auth/station-house-officer");
const authCCTNS = require("../routes/auth/cctns");
const error = require("../middleware/error");
const users = require("../routes/users");
const otp = require("../routes/otp");
const stationHouseOfficers = require("../routes/station-house-officers");
const cctns = require("../routes/cctns");
const policeStations = require("../routes/police-stations");
const firstInformationReport = require("../routes/first-information-reports");
const userFirstInformationReports = require("../routes/user/first-information-reports");
const shoFirstInformationReports = require("../routes/station-house-officer/first-information-reports");
const cctnsFirstInformationReports = require("../routes/cctns/first-information-reports");
const suspects = require("../routes/suspects");
const notes = require("../routes/notes");
const verification = require("../routes/auth/verification");
const cors = require("cors");

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.static('static'));
    app.use("/api/users", users);
    app.use("/api/otp", otp);
    app.use("/api/verification", verification);
    app.use("/api/auth/station-house-officer", authStationHouseOfficer);
    app.use("/api/auth/cctns", authCCTNS);
    app.use("/api/station-house-officers", stationHouseOfficers);
    app.use("/api/cctns", cctns);
    app.use("/api/police-stations", policeStations);
    app.use("/api/first-information-reports", firstInformationReport);
    app.use("/api/user/:user_id/first-information-reports", userFirstInformationReports);
    app.use("/api/station-house-officer/:aadhaar_number/first-information-reports", shoFirstInformationReports);
    app.use("/api/cctns/first-information-reports", cctnsFirstInformationReports);
    app.use("/api/suspects", suspects);
    app.use("/api/notes", notes);
    app.use(error);
}