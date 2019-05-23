const express = require("express");

module.exports = (routes) => {
    const router = express.Router();
    routes.forEach(route => router.use(...route));
    return router;
}