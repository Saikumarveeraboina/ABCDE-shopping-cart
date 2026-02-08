import { useEffect, useState } from "react";
import "./CartPage.css";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../api/axios";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/carts");
      setCart(res.data);
    } catch (error) {
      console.log("Fetch Cart Error:", error);
    }
  };

  const updateQty = async (itemId, quantity) => {
    try {
      if (quantity <= 0) return; // prevent negative qty

      await API.put("/carts", { itemId, quantity });

      fetchCart();
    } catch (error) {
      console.log("Update Qty Error:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.delete("/carts", {
        data: { itemId }
      });

      fetchCart();
    } catch (error) {
      console.log("Remove Item Error:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await API.post("/orders");

      alert("Order placed successfully 🎉");

      fetchCart();
    } catch (error) {
      console.log("Checkout Error:", error);
      alert("Checkout failed");
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;

    return cart.items.reduce((sum, item) => {
      if (!item?.itemId) return sum;

      return sum + (item.itemId.price || 0) * (item.quantity || 1);
    }, 0);
  };

  return (
    <div className="cart-wrapper">
      <Navbar />

      <div className="cart-container">
        <h2>Your Cart 🛒</h2>

        {!cart?.items || cart.items.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => {
                if (!item?.itemId) return null;

                return (
                  <div className="cart-item" key={item._id}>
                    <img
                      src={item.itemId.image}
                      alt={item.itemId.name}
                    />

                    <div className="cart-details">
                      <h4>{item.itemId.name}</h4>
                      <p>₹ {item.itemId.price}</p>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQty(
                              item.itemId._id,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQty(
                              item.itemId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeItem(item.itemId._id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="checkout-section">
              <h3>Total: ₹ {calculateTotal()}</h3>
              <button onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
