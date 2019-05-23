const express = require("express");

const router = express.Router();

router.all("*", (req, res) => {
    res.status(404).json({ message: "No API is available on this path" });
});

module.exports = router;