const path = require("path");
const deepFreeze = require('deep-freeze');
const argv = require("@/utils/argv");
const { envName } = require("@/utils/env");
const requireOrDefault = require("@/utils/requireOrDefault");

const base = require("./config.js");
const overrides = requireOrDefault(path.resolve(__dirname, `./config.${envName}.js`));

const final = { ...base, ...overrides };

for (field in final) {
    if (typeof final[field] === 'string' || final[field] instanceof String) {
        final[field] = argv[field] || process.env[field.toUpperCase()] || final[field];
    }
}

const frozen = deepFreeze(final);

module.exports = frozen;

//TO START MONGO
//"D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"