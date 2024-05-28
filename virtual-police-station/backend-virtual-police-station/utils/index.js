const fs = require("fs")

function capitalize(str) {
    if (str == null) return null;
    if (!isNaN(str)) return null;
    if (str.length == 1) return str.toUpperCase();
    const arrayString = str.split(" ");
    const result = arrayString.map(a => a[0].toUpperCase() + a.substring(1));
    return result.join(" ");
}

function rawToJson(raw) {
    return JSON.parse(JSON.stringify(raw));
}

function makeDirectory(directoryName) {
    fs.mkdir(directoryName, { recursive: true }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("New directory successfully created.");
        }
    })
}

module.exports = { capitalize, rawToJson, makeDirectory };