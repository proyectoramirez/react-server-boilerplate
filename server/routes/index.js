const express = require("express");
const api = require("./api");
const frontEnd = require("./frontend");

const router = express.Router();

router.use("/api", api);
router.use("/app", frontEnd);
router.use("/", express.static("public"));

module.exports = router;