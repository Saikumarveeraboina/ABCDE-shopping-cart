import { useEffect, useState } from "react";
import "./ItemPage.css";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../api/axios";

export default function ItemPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data || []);
    } catch (error) {
      console.log("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await API.post("/carts", { itemId });

      alert("Item added to cart 🛒");
    } catch (error) {
      console.log("Add to Cart Error:", error);
      alert("Error adding item to cart");
    }
  };

  return (
    <div className="items-wrapper">
      <Navbar />

      <div className="items-grid">
        {loading ? (
          <p className="no-items">Loading products...</p>
        ) : items.length === 0 ? (
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

                <button
                  onClick={() => handleAddToCart(item._id)}
                >
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
