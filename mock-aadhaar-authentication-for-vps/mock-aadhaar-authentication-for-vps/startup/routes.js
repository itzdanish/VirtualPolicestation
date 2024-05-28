const express = require("express");
const aadhaars = require("../routes/aadhaars");
const users = require("../routes/users");
const otp = require("../routes/otp");
const admin = require("../routes/auth/admin");
const user = require("../routes/auth/user");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/aadhaars", aadhaars);
  app.use("/api/users", users);
  app.use("/api/otp", otp);
  app.use("/api/auth/admin", admin);
  app.use("/api/auth/user", user);
  app.use(error);
};
