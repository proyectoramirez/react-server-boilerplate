const express = require("express");
const { resolve } = require("path");
const config = require("../../config");

module.exports = () => {
    const router = express.Router();

    router.use(express.static(outputPath));

    router.get("*", (req, res) => {
        res.sendFile(resolve(config.outputPath, "index.html"));
    });

    return router;
}