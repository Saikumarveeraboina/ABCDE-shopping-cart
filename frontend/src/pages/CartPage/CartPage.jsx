import { useEffect, useState } from "react";
import "./CartPage.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default function CartPage() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/carts",
            { headers: { Authorization: token } }
        );

        setCart(res.data);
    };

    const updateQty = async (itemId, quantity) => {
        const token = localStorage.getItem("token");

        await axios.put(
            "http://localhost:5000/api/carts",
            { itemId, quantity },
            { headers: { Authorization: token } }
        );

        fetchCart();
    };

    const removeItem = async (itemId) => {
        const token = localStorage.getItem("token");

        await axios.delete(
            "http://localhost:5000/api/carts",
            {
                headers: { Authorization: token },
                data: { itemId }
            }
        );

        fetchCart();
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/orders",
                {},
                { headers: { Authorization: token } }
            );

            alert("Order placed successfully 🎉");

            fetchCart(); // refresh cart after order

        } catch (error) {
            console.log(error);
            alert("Checkout failed");
        }
    };


    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;

        return cart.items.reduce(
            (sum, item) =>
               sum + (item.itemId.price || 0) * (item.quantity || 1),

            0
        );
    };

    return (
        <div className="cart-wrapper">
            <Navbar />

            <div className="cart-container">
                <h2>Your Cart 🛒</h2>

                {!cart || !cart.items || cart.items.length === 0 ? (
                    <p className="empty-cart">Cart is empty</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.items.map((item) => (
                                <div className="cart-item" key={item._id}>
                                    <img
                                        src={item.itemId.image}
                                        alt={item.itemId.name}
                                    />

                                    <div className="cart-details">
                                        <h4>{item.itemId.name}</h4>
                                        <p>₹ {item.itemId.price}</p>

                                        <div className="quantity-controls">
                                            <button onClick={() =>
                                                updateQty(
                                                    item.itemId._id,
                                                    item.quantity - 1
                                                )
                                            }>-</button>

                                            <span>{item.quantity}</span>

                                            <button onClick={() =>
                                                updateQty(
                                                    item.itemId._id,
                                                    item.quantity + 1
                                                )
                                            }>+</button>
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
                            ))}
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
