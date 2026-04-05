import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [deliveryUsers, setDeliveryUsers] = useState([]);
    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchOrders();

        if (role === "admin") {
            fetchDeliveryUsers();
        }
    }, []);

    // 📦 Fetch Orders
    const fetchOrders = async () => {
        try {
            const res = await API.get("orders/");
            // ✅ Delivery sees all orders
            setOrders(res.data.results || res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // 🚴 Fetch Delivery Users (for admin)
    const fetchDeliveryUsers = async () => {
        try {
            const res = await API.get("auth/users/?role=delivery");
            setDeliveryUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // 👨‍💼 Assign Delivery (Admin only)
    const assignDelivery = async (orderId, deliveryId) => {
        try {
            await API.post(`orders/${orderId}/assign/`, {
                delivery_id: deliveryId,
            });
            alert("Delivery assigned ✅");
            fetchOrders();
        } catch (err) {
            alert("Error assigning delivery");
        }
    };

    // 🚴 Mark Delivered (Delivery only)
    const markDelivered = async (id) => {
        try {
            await API.patch(`orders/${id}/status/`);
            fetchOrders();
        } catch (err) {
            alert("Error marking delivered");
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", background: "#f5f6fa" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Orders</h2>

                <div style={styles.grid}>
                    {orders.map((o) => (
                        <div key={o.id} style={styles.card}>
                            <h4>Order #{o.id}</h4>
                            <p>Status: <span style={getStatusColor(o.status)}>{o.status}</span></p>
                            <p>Assigned: {o.assigned_to || "Not assigned"}</p>

                            <div>
                                <strong>Items:</strong>
                                {o.items?.map((item) => (
                                    <p key={item.id}>{item.product_name} x {item.quantity}</p>
                                ))}
                            </div>

                            {/* 👨‍💼 ADMIN → Assign Delivery */}
                            {role === "admin" && o.status !== "delivered" && (
                                <div style={{ marginTop: "10px" }}>
                                    <p><strong>Assign Delivery:</strong></p>
                                    <select
                                        onChange={(e) => assignDelivery(o.id, e.target.value)}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select Delivery Person</option>
                                        {deliveryUsers.map((d) => (
                                            <option key={d.id} value={d.id}>{d.username}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* 🚴 DELIVERY → Mark Delivered */}
                            {role === "delivery" && o.status !== "delivered" && (
                                <button
                                    onClick={() => markDelivered(o.id)}
                                    style={styles.deliverBtn}
                                >
                                    Mark Delivered
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// 🎨 Status Colors
const getStatusColor = (status) => {
    if (status === "pending") return { color: "gray" };
    if (status === "assigned") return { color: "orange" };
    if (status === "delivered") return { color: "green" };
};

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    card: {
        borderRadius: "12px",
        padding: "20px",
        textAlign: "left",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    deliverBtn: {
        marginTop: "10px",
        padding: "10px 15px",
        background: "orange",
        border: "none",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Orders;