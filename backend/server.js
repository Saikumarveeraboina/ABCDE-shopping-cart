const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/auth");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");




const app = express();


connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://abcde-shopping-cart.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);



app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/test", async (req, res) => {
  const mongoose = require("mongoose");
  await mongoose.connection.db.createCollection("testCollection");
  res.send("Test collection created");
});

app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user.username });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
