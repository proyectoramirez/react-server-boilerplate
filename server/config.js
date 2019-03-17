const argv = require("./utils/argv");

const config = {
    host: "localhost",
    port: "3000",
    
    db_server: "127.0.0.1:27017",
    db_name: "Panus",

    frontend_public_path: "/"
}

const buildFinalConfig = () => {
    for (field in config) {
        config[field] = argv[field] || process.env[field.toUpperCase()] || config[field];
    }

    return config;
}

module.exports = buildFinalConfig();

//TO START MONGO
//"D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"