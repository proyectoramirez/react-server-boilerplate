const express = require("express");
const isDev = require("../../utils/isDev");
const devSetup = require("./devSetup");
const prodSetup = require("./prodSetup");

const router = express.Router();

if (isDev) {
    devSetup(router)
} else {
    prodSetup(router);
}

module.exports = router;