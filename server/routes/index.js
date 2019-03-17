const express = require("express");
const api = require("./api");
const frontEnd = require("./frontend");
const config = require("../config");

const router = express.Router();

router.use("/api", api);
router.use(config.frontend_public_path, frontEnd);
router.use("/", express.static("public"));

module.exports = router;