const Cart = require("../models/Cart");
const Item = require("../models/Item");

exports.addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (i) => i.itemId.toString() === itemId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ itemId, quantity: 1 });
    }

    await cart.save();

    res.json({ message: "Item added to cart" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate("items.itemId");

    if (!cart) {
      return res.json({ message: "Cart is empty" });
    }

    res.json(cart);

  } catch (error) {
    console.log("GET CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.itemId.toString() !== itemId
    );

    await cart.save();

    res.json({ message: "Item removed from cart" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.itemId.toString() === itemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.itemId.toString() !== itemId
      );
    }

    await cart.save();

    res.json({ message: "Quantity updated" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
