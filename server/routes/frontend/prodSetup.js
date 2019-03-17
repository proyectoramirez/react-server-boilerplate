const express = require("express");
const { resolve } = require("path");
const config = require("../../config");

module.exports = (router) => {
    const outputPath = config.outputPath;

    router.use(express.static(outputPath));

    router.get("*", (req, res) => {
        res.sendFile(resolve(outputPath, "index.html"));
    });
}