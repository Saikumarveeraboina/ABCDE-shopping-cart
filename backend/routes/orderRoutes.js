const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderController");

router.get("/", auth, getOrders);


// POST /api/orders → Convert cart to order (Protected)
router.post("/", auth, createOrder);

module.exports = router;
