import "./OrdersPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: { Authorization: token }
        }
      );

      setOrders(res.data || []);
    } catch (error) {
      console.log("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((sum, item) => {
      if (!item?.itemId) return sum;

      const price = item.itemId.price || 0;
      const qty = item.quantity || 1;

      return sum + price * qty;
    }, 0);
  };

  return (
    <div className="orders-wrapper">
      <Navbar />

      <div className="orders-container">
        <h2>Your Orders 📦</h2>

        {loading ? (
          <p className="empty-orders">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="empty-orders">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-id">
                Order ID: {order._id}
              </div>

              <div className="order-items">
                {order.items.map((item) => {
                  if (!item?.itemId) return null;

                  const price = item.itemId.price || 0;
                  const qty = item.quantity || 1;

                  return (
                    <div
                      key={item._id}
                      className="order-item"
                    >
                      <span>
                        {item.itemId.name} x {qty}
                      </span>

                      <span>
                        ₹ {price * qty}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="order-total">
                Total: ₹ {calculateOrderTotal(order)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
