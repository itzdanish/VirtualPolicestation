const mysql = require('mysql');
const config = require("config");
require("dotenv").config();

const pool = mysql.createPool({
    host: config.get("database.host"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function findById(table, key, value, column) {
    const sql = column ? mysql.format(`SELECT ?? FROM ?? WHERE ?? = ?`, [column, table, key, value])
        : mysql.format(`SELECT * FROM ?? WHERE ?? = ?`, [table, key, value]);

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    })
}

function find(table, column) {

    const sql = column ? mysql.format(`SELECT ?? FROM ??`, [column, table])
        : mysql.format(`SELECT * FROM ??`, [table]);

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    })
}

function insert(table, values) {
    const sql = mysql.format(`INSERT INTO ?? SET ? `, [table, values]);

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    })
}

function update(table, values, key, id) {
    const sql = mysql.format(`UPDATE ?? SET ? WHERE ?? = ?`, [table, values, key, id]);

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    })
}

function remove(table, key, value) {
    const sql = mysql.format(`DELETE FROM ?? WHERE ?? = ?`, [table, key, value]);

    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    })
}

function getPermissionString(user, userType) {
    const sql = mysql.format(`SELECT permission_string from permission where id IN (SELECT role.permission_id FROM ?? INNER JOIN role ON ??.role_id = role.id where ??.id = ?)`, [userType, userType, userType, user.id]);
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    });
}

function verifyOtp(aadhaar_number, otp) {
    const sql = mysql.format(`SELECT * from otp where aadhaar_number = ? && otp = ?`, [aadhaar_number, otp]);
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, result) => {
            if (error) return reject(error);
            else return resolve(result);
        })
    });
}


module.exports = {
    find,
    findById,
    insert,
    remove,
    update,
    getPermissionString,
    verifyOtp
}

