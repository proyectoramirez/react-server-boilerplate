const mongoose = require("mongoose");
const config = require("@/config");
const logger = require("@/utils/logger");

function setupDB() {
    return mongoose.connect(config.connectionStrings.db, { useNewUrlParser: true })
        .then(() => {
            console.log();
            logger.timestamp();
            logger.info();
        }).catch(err => {
            console.log();
            logger.timestamp();
            logger.error(err + "\n");
            throw err;
        });
}

// mongoose.connection.on("connecting", () => logger.info("Connecting to database..."));
// mongoose.connection.on("connected", () => logger.info("Database connected"));
// mongoose.connection.on("disconnected", () => logger.info("Connection to database lost"));
// mongoose.connection.on("reconnected", () => logger.info("Recovered database connection"));

module.exports = setupDB;