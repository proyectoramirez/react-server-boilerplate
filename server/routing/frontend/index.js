const { isDev } = require("@/utils/env");
const devSetup = require("./devSetup");
const prodSetup = require("./prodSetup");

const router = isDev ? devSetup() : prodSetup()

module.exports = router;