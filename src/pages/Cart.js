import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    // Redirect non-customers
    useEffect(() => {
        if (role !== "customer") navigate("/products");
        else {
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(storedCart);
        }
    }, []);

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const placeOrder = async () => {
        if (cart.length === 0) return alert("Cart is empty!");

        try {
            await API.post("orders/", { items: cart });
            alert("Order placed ✅");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/orders");
        } catch (err) {
            console.log(err);
            alert("Order failed!");
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Your Cart ({cart.length})</h2>

                    {cart.length === 0 ? (
                        <p style={styles.emptyText}>No items in cart 😢</p>
                    ) : (
                        <>
                            {cart.map((item, index) => (
                                <div key={index} style={styles.item}>
                                    <div style={styles.itemInfo}>
                                        <p style={styles.itemLabel}>Product ID</p>
                                        <p style={styles.itemValue}>{item.product_id}</p>
                                    </div>
                                    <div style={styles.itemInfo}>
                                        <p style={styles.itemLabel}>Quantity</p>
                                        <p style={styles.itemValue}>{item.quantity}</p>
                                    </div>
                                    <button onClick={() => removeItem(index)} style={styles.removeBtn}>
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <button onClick={placeOrder} style={styles.placeOrderBtn}>
                                Place Order
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

const styles = {
    page: {
        minHeight: "calc(100vh - 70px)",
        padding: "30px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#f4f7fb",
    },
    card: {
        width: "100%",
        maxWidth: "760px",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "32px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        margin: 0,
        marginBottom: "24px",
        color: "#1c2330",
        fontSize: "2rem",
        textAlign: "center",
    },
    emptyText: {
        color: "#5a6270",
        fontSize: "1.1rem",
        marginTop: "12px",
    },
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "18px 20px",
        marginBottom: "16px",
        border: "1px solid #e1e8f2",
        borderRadius: "14px",
        background: "#fbfdff",
        gap: "18px",
    },
    itemInfo: {
        minWidth: 0,
    },
    itemLabel: {
        margin: 0,
        color: "#7b8496",
        fontSize: "0.85rem",
    },
    itemValue: {
        margin: "6px 0 0",
        color: "#18202d",
        fontSize: "1rem",
        fontWeight: 600,
    },
    removeBtn: {
        background: "#ff4f4f",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "10px",
        cursor: "pointer",
        minWidth: "100px",
        transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    placeOrderBtn: {
        marginTop: "10px",
        width: "230px",
        background: "#0b6f2f",
        color: "#fff",
        padding: "14px 18px",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: 600,
        boxShadow: "0 12px 24px rgba(11, 111, 47, 0.18)",
    },
};

export default Cart;