import "./Navbar.css";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaBoxOpen,
  FaStore
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, [location.pathname]); // refresh when page changes

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/carts",
        { headers: { Authorization: token } }
      );

      if (res.data.items) {
        const total = res.data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { headers: { Authorization: token } }
    );

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/items")}>
        ShopSphere 🛒
      </div>

      <div className="nav-actions">
        <button onClick={() => navigate("/items")}>
          <FaStore /> Items
        </button>

        <button onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          Cart
          {count > 0 && <span className="badge">{count}</span>}
        </button>

        <button onClick={() => navigate("/orders")}>
          <FaBoxOpen /> Orders
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
