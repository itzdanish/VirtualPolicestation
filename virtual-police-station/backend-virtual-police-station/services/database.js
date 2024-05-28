const mysql = require('mysql');
const config = require("config");
const utils = require("../utils/index");
const error = require("../utils/error");

const pool = mysql.createPool({
    host: config.get("database.host"),
    user: config.get("database.user"),
    password: process.env.db_password,
    database: config.get("database.name"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function findById(table, keyValue) {
    const query = `SELECT * FROM ?? WHERE (??) = (?)`;
    const sql = format(query, table, keyValue);
    return execute(sql);
}

function find(table) {
    const sql = mysql.format(`SELECT * FROM ??`, [table]);
    return execute(sql);
}

function insert(table, keyValue) {
    const sql = mysql.format(`INSERT INTO ?? SET ? `, [table, keyValue]);
    return execute(sql);
}

async function update(table, keyValue, updates) {
    const query = `UPDATE ?? SET ? WHERE (??) = (?)`;
    const sql = format(query, table, keyValue, updates);
    return execute(sql);
}

function remove(table, keyValue) {
    const query = `DELETE FROM ?? WHERE (??) = (?)`;
    const sql = format(query, table, keyValue);
    return execute(sql);
}

function getPermissionString(user, userType) {
    const sql = mysql.format(`SELECT permission_string from permission where id IN (SELECT role.permission_id FROM ?? INNER JOIN role ON ??.role_id = role.id where ??.id = ?)`, [userType, userType, userType, user.id]);
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(utils.rawToJson(result));
        })
    });
}

function execute(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                const { code, sqlMessage } = err;
                return reject(new error.BadRequest({ code, sqlMessage }));
            }
            else return resolve(utils.rawToJson(result));
        });
    });
}

function format(query, table, keyValue, updates) {
    const keys = Object.keys(keyValue);
    const values = Object.values(keyValue);
    const sql = !updates ? mysql.format(query, [table, keys, values]) : mysql.format(query, [table, updates, keys, values]);
    return sql;
}


module.exports = {
    find,
    findById,
    insert,
    remove,
    update,
    getPermissionString,
    execute
}

