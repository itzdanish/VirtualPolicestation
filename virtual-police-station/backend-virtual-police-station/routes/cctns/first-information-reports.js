const express = require("express");
require("express-async-errors");
const _ = require("lodash");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });
const fs = require("fs");
const { BadRequest } = require("../../utils/error");
const auth = require("../../middleware/auth");
const { OK } = require("../../utils/success");
const multer = require("multer");
const { makeDirectory } = require("../../utils");
const handler = require("../handler");

const table = `cctns_first_information_report`;
const resourceName = "First Information Report";

router.get(`/`, async (req, res) => {
    const query = `SELECT * FROM cctns_first_information_report`;
    const firs = await database.execute(query);

    const firs_with_status = [];
    for (const fir of firs) {
        const { status_id } = fir;
        const status = await getStatus(status_id);
        firs_with_status.push({ ...fir, ...status });
    }

    res.send(firs_with_status);
});

router.get(`/:fir_number`, async (req, res) => {
    const { fir_number } = req.params;
    const data = await database.findById(table, { fir_number });
    if (!data.length) return res.send([]);
    const fir = data[0];
    let firs_with_full_information = await getFirsWithFullInformation(fir);
    const signatures = getSignatures(fir_number);
    const photos = getImagesUploadedByVictim(fir_number);
    firs_with_full_information = { ...firs_with_full_information, upload_by_victim: photos, signatures }

    res.send(firs_with_full_information);
});

router.put(`/:fir_number`, [auth], async (req, res) => {
    const fir_number = req.params;
    const existFir = await database.findById(`first_information_report`, fir_number);
    if (existFir.length) return res.status(400).send(new BadRequest("FIR already approved"));

    let data = await database.findById(table, fir_number);
    if (!data.length) return res.status(404).send(new BadRequest("FIR not found."));

    const fir = _.omit(data[0], ['id']);
    database.insert('first_information_report', fir);
    database.remove(table, fir_number);

    res.status(200).send(new OK("Approved successfully."));

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


async function getFirsWithFullInformation(fir) {
    const { status_id, police_station_number, user_id } = fir;
    let police_station = await getPoliceStation(police_station_number);
    let status = await getStatus(status_id);
    let user = await getUser(user_id);
    user = _.omit(user, ['password', 'id']);
    police_station = _.omit(police_station, ['id']);
    status = _.omit(status, ['id']);
    return { ...fir, ...user, ...status, ...police_station };

}

async function getPoliceStation(police_station_number) {
    return (await database.findById("police_station", { police_station_number }))[0];
}

async function getStatus(status_id) {
    return (await database.findById("status", { id: status_id }))[0];
}

async function getUser(user_id) {
    return (await database.findById("user", { id: user_id }))[0];
}

function getSignatures(fir_number) {
    return fs.readdirSync(`./static/fir/signatures/${fir_number}`);
}

function getImagesUploadedBySho(fir_number) {
    return fs.readdirSync(`./static/fir/uploaded_by_sho/${fir_number}`);
}

function getImagesUploadedByVictim(fir_number) {
    return fs.readdirSync(`./static/fir/uploaded_by_victim/${fir_number}`);
}


module.exports = router;
