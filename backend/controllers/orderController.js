const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    // 1️⃣ Find user's cart
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Create new order
    const order = new Order({
      userId: req.user._id,
      items: cart.items
    });

    await order.save();

    // 3️⃣ Delete cart
    await Cart.deleteOne({ _id: cart._id });

    res.json({ message: "Order placed successfully" });

  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.itemId");

    res.json(orders);

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
