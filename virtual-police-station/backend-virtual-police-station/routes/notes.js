const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/note");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();
const multer = require("multer");
const { makeDirectory } = require("../utils");

const table = "note";
const id = `fir_number`;
const resourceName = "Note";

router.get('/', auth, async (req, res) => {
    const notes = await database.find(table);
    res.send(notes);
});


router.get(`/:${id}`, auth, async (req, res) => {
    const primaryKey = req.params;
    await handler.get(req, res, table, primaryKey, resourceName);
});

router.post('/', [validateBody(validate), auth], async (req, res) => {
    const primaryKey = ['id'];
    const note = req.body;
    note.id = null
    await handler.post(req, res, table, note, primaryKey, resourceName);
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { fir_number } = req.params;
        const photosDirectory = `./static/fir/uploaded_by_sho/${fir_number}`;
        makeDirectory(photosDirectory);
        cb(null, photosDirectory);
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
});

const upload = multer({ storage });
var cpUpload = upload.array('photos', { maxcount: 12 });

router.post("/:fir_number", [cpUpload, auth], async (req, res) => {
    const { fir_number } = req.params;
    const { note, status } = req.body;
    const data = await database.findById("first_information_report", { fir_number });
    if (!data.length) {
        return res.send("Fir not found.");
    }
    if (status) await database.update("first_information_report", { fir_number }, { status_id: status });
    await database.insert(table, { fir_number, note });
    res.send("FIR updated.");
})

module.exports = router;
