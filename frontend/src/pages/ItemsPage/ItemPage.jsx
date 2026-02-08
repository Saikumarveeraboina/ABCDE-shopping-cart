import { useEffect, useState } from "react";
import "./ItemPage.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default function ItemPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/carts",
        { itemId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Item added to cart 🛒");
    } catch (error) {
      console.log(error);
      alert("Error adding item to cart");
    }
  };

  return (
    <div className="items-wrapper">
      <Navbar />

      <div className="items-grid">
        {items.length === 0 ? (
          <p className="no-items">No products available</p>
        ) : (
          items.map((item) => (
            <div className="item-card" key={item._id}>
              <div className="image-container">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                <button onClick={() => handleAddToCart(item._id)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
