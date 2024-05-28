const express = require("express");
require("express-async-errors");
const _ = require("lodash");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });
const fs = require("fs");
const auth = require("../../middleware/auth");

const table = `first_information_report`;

router.get(`/`, [auth], async (req, res) => {
    const id = req.params;
    const firs = await database.findById(table, id);
    const firs_with_status = [];
    for (const fir of firs) {
        const { status_id } = fir;
        const status = await getStatus(status_id);
        firs_with_status.push({ ...fir, ...status });
    }
    res.send(firs_with_status);
});

router.get(`/:fir_number`, [auth], async (req, res) => {
    const params = req.params;
    const data = await database.findById(table, params);
    if (!data.length) return res.send([]);
    const fir = data[0];
    let firs_with_full_information = await getFirsWithFullInformation(fir);
    const signatures = getSignatures(params.fir_number);
    const photos = getImagesUploadedByVictim(params.fir_number);
    firs_with_full_information = { ...firs_with_full_information, upload_by_victim: photos, signatures }
    res.send(firs_with_full_information);
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
