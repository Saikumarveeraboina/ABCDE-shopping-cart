require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("./models/Item");

const seedItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    // Clear old items
    await Item.deleteMany({});

    const items = [
  {
    name: "MacBook Pro",
    price: 120000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "iPhone 15",
    price: 80000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sony Headphones",
    price: 15000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Smart Watch",
    price: 10000,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Gaming Mouse",
    price: 3000,
    image: "https://images.unsplash.com/photo-1587202372775-9894d53a8a27?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Samsung Galaxy S24",
    price: 75000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dell XPS 13 Laptop",
    price: 95000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Bose QuietComfort Earbuds",
    price: 18000,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Apple AirPods Pro",
    price: 22000,
    image: "https://images.unsplash.com/photo-1605640840927-0d4e8d9796f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Google Pixel 8",
    price: 65000,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Asus ROG Gaming Laptop",
    price: 145000,
    image: "https://images.unsplash.com/photo-1611078489935-0cb4c2497a00?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Canon EOS M50 Camera",
    price: 52000,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sony PlayStation 5 Controller",
    price: 6500,
    image: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    price: 135000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Nikon Z50 Mirrorless Camera",
    price: 68000,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Apple iPad Air",
    price: 55000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Acer Predator Gaming Monitor",
    price: 32000,
    image: "https://images.unsplash.com/photo-1588108246893-c8f8907b42d0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    price: 22000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "HyperX Cloud II Gaming Headset",
    price: 7500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "GoPro Hero 12 Black",
    price: 38000,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80"
  }
];


    await Item.insertMany(items);
    console.log(`Bulk inserted ${items.length} items successfully 🎉`);
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedItems();