const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Create new user
    const user = new User({ username, password });

    await user.save(); // password hashing runs automatically

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
  console.log("REGISTER ERROR:", error);
  res.status(500).json({ message: error.message });
}

};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username/password" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username/password" });
    }

    // 3️⃣ Generate NEW token (overwrite old one)
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Save token in DB
    user.token = token;
    await user.save();

    res.status(200).json({ token });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
