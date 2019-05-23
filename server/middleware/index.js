const express = require("express");
const { isDev } = require("@/utils/env");
const commonMiddleware = require("./middleware");
const specificMiddleware = require(isDev ? "./middleware.development" : "./middleware.production");

const router = express.Router();
router.use(commonMiddleware, specificMiddleware);

module.exports = router;