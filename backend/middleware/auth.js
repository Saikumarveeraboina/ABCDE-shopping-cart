const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    if (user.token !== token) {
      return res.status(401).json({ message: "Session invalid." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
