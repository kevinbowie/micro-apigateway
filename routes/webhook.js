const express = require("express");
const router = express.Router();

const webhookHandler = require("./handler/webook");

router.post("/", webhookHandler.webhook);

module.exports = router;
