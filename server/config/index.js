const argv = require("../utils/argv");
const envDefaults = require("./envDefaults");
const constants = require("./constants");

for (field in envDefaults) {
    envDefaults[field] = argv[field] || process.env[field.toUpperCase()] || envDefaults[field];
}

module.exports = {...envDefaults, ...constants};

//TO START MONGO
//"D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"