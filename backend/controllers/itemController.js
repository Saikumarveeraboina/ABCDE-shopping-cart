const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const item = new Item({ name, price, image });

    await item.save();

    res.status(201).json({ message: "Item created successfully" });

  } catch (error) {
    console.log("CREATE ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.log("GET ITEMS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
