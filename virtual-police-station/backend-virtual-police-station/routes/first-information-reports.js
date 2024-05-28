const express = require("express");
require("express-async-errors");
const _ = require("lodash");
const database = require('../services/database');
const { validate } = require("../validators/first-information-report");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();
const fs = require("fs")
const multer = require("multer");
const { makeDirectory } = require("../utils");

const table = "first_information_report";
const id = `fir_number`;
const resourceName = "First Information Report";


router.get('/', [auth], async (req, res) => {
    const firs = await database.find(table);
    res.send(firs);
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { fir_number } = req.body;
        console.log(req.body);

        if (file.fieldname === 'victim_signature') {
            const signDirectory = `./static/fir/signatures/${fir_number}`;
            makeDirectory(signDirectory);
            cb(null, signDirectory);
            return;
        }
        const photosDirectory = `./static/fir/uploaded_by_victim/${fir_number}`;
        makeDirectory(photosDirectory);
        cb(null, photosDirectory);
    },
    filename: function (req, file, cb) {
        if (file.fieldname == 'victim_signature') {
            var filename = file.originalname;
            var fileExtension = filename.split(".")[1];
            cb(null, 'victim' + "." + fileExtension);
            return;
        }
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
});

const upload = multer({ storage });
var cpUpload = upload.fields([{ name: 'victim_signature', maxCount: 1 }, { name: 'photos', maxCount: 8 }]);

router.post('/', [cpUpload, auth], async (req, res) => {
    const primaryKey = ['fir_number'];
    const firstInformationReport = req.body;
    await handler.post(req, res, table, firstInformationReport, primaryKey, resourceName);
});

router.put(`/:${id}`, [validateBody(validate), auth], async (req, res) => {
    const primaryKey = req.params;
    const updates = req.body;
    await handler.put(req, res, table, primaryKey, updates, resourceName);
});


router.delete(`/:${id}`, [auth], async (req, res) => {
    const primaryKey = req.params;
    await handler.delete(req, res, table, primaryKey, resourceName);
});

module.exports = router;
