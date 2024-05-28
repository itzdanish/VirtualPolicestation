require("express-async-errors");
const _ = require("lodash");
const database = require('../services/database');
const {BadRequest, NotFound} = require("../utils/error");
const {Created, OK} = require("../utils/success");
const utils = require("../utils/index");

async function get(req, res, table, primaryKey, resourceName = "Resource") {

    let data = await database.findById(table, primaryKey);
    if (!data.length) return res.status(404).send(new NotFound(`${resourceName} is not found with given id.`));

    res.send(data);
};


async function post(req, res, table, newData, primaryKey, resourceName = "Resource", others = undefined) {

    primaryKey = _.pick(newData, primaryKey);
    let data = await database.findById(table, primaryKey);
    if (data.length) return res.status(400).send(new BadRequest(`${resourceName} is already registered.`));

    await database.insert(table, newData);

    res.status(201).send(new Created(`${resourceName} successfully created.`, others));

};


async function put(req, res, table, primaryKey, updates, resourceName = "Resource") {

    let data = await database.findById(table, primaryKey);
    if (!data.length) return res.status(404).send(new NotFound(`${resourceName} is not found with given id.`));

    await database.update(table, primaryKey, updates);

    res.status(201).send(new OK(`${resourceName} successfully updated.`));

};

async function remove(req, res, table, primaryKey, resourceName = "Resource") {

    let data = await database.findById(table, primaryKey);
    if (!data.length) return res.status(404).send(new NotFound(`${resourceName} is not found with given id.`));

    await database.remove(table, primaryKey);

    res.status(200).send(new OK(`${resourceName} sucessfully deleted.`));

};

module.exports = {
    get,
    post,
    put,
    delete: remove
};
