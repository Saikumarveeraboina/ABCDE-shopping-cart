const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { addToCart } = require("../controllers/cartController");
const { getCart } = require("../controllers/cartController");
const {  removeFromCart } = require("../controllers/cartController");
const { updateQuantity } = require("../controllers/cartController");

router.delete("/", auth, removeFromCart);


router.get("/", auth, getCart);
router.put("/", auth, updateQuantity);



// POST /api/carts → Add item to cart (Protected)
router.post("/", auth, addToCart);

module.exports = router;
