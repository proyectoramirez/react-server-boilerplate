//Sets up require aliases
require('module-alias/register');

const express = require("express");
const config = require("./config");
const setupDB = require("./database");
const middleware = require("./middleware");
const routing = require("./routing");
const logger = require("./utils/logger");

const app = express();

app.use(middleware);
app.use(routing);

setupDB().catch(() => {}).finally(startServer);

function startServer() {
    const host = config.host;
    const port = config.port;

    // Start your app.
    app.listen(port, host, err => {
        if (err) {
            return logger.error(err);
        }
        logger.appStarted(port, host);
    });
}