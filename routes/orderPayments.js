const express = require("express");
const router = express.Router();

const orderPaymentsHandler = require("./handler/order-payment");

/* GET users listing. */
router.get("/", orderPaymentsHandler.getOrders);

module.exports = router;
