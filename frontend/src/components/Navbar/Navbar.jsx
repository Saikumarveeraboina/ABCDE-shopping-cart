import "./Navbar.css";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaBoxOpen,
  FaStore,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchCartCount();
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.remove("light");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const fetchCartCount = async () => {
    try {
      const res = await API.get("/carts");

      if (res.data?.items) {
        const total = res.data.items.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCount(total);
      } else {
        setCount(0);
      }
    } catch {
      setCount(0);
    }
  };

  const handleLogout = async () => {
    await API.post("/users/logout");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/items")}>
        ABCDE shopping 🛒
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

        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}
