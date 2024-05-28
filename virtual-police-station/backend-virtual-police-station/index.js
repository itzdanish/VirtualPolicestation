const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

require("./startup/logging");
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on ${port}`));