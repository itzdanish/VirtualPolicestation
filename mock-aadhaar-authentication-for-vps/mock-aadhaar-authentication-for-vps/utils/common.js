function rawToJson(raw){
    return JSON.parse(JSON.stringify(raw));
}


module.exports = {
    rawToJson,
}