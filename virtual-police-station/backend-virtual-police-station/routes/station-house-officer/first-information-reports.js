const express = require("express");
require("express-async-errors");
const _ = require("lodash");
const database = require('../../services/database');
const { validate } = require("../../validators/first-information-report");
const router = express.Router({ mergeParams: true });
const fs = require("fs")
const multer = require("multer");


const table = `first_information_report`;

router.get(`/`, async (req, res) => {
    const { aadhaar_number } = req.params;
    const query = `SELECT * FROM first_information_report fir JOIN (SELECT ps.police_station_number FROM station_house_officer sho JOIN police_station ps ON sho.id = ps.station_house_officer_id WHERE sho.aadhaar_number = '${aadhaar_number}') sho_ps ON sho_ps.police_station_number = fir.police_station_number`;
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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { fir_number } = req.params;
        const photosDirectory = `./static/fir/signatures/${fir_number}`;
        cb(null, photosDirectory);
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, `station_house_officer` + "." + fileExtension);
    }
});

const upload = multer({ storage });
var cpUpload = upload.single('signature');

router.put("/:fir_number", cpUpload, async (req, res) => {
    const { fir_number } = req.params;
    const data = await database.findById(table, { fir_number });
    if (!data.length) return res.send("Fir not found.");

    const updates = await database.update(table, { fir_number }, { is_signed: 1 });
    res.send("FIR Updated.");
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
