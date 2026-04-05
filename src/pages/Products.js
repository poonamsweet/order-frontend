import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "" });

    // 🔥 Redirect delivery users to orders page
    useEffect(() => {
        if (role === "delivery") {
            navigate("/orders");
        } else {
            fetchProducts();
        }
    }, []);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await API.get("products/");
            setProducts(res.data.results || res.data);
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    // 🛒 CUSTOMER: Add to cart
    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = [...storedCart, { product_id: product.id, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Added to cart ✅");
    };

    // 👨‍💼 ADMIN: Add product
    const createProduct = async () => {
        try {
            await API.post("products/", newProduct);
            alert("Product added ✅");
            setNewProduct({ name: "", price: "" });
            fetchProducts();
        } catch (err) {
            console.log(err);
            alert("Failed to add product");
        }
    };

    // 👨‍💼 ADMIN: Delete product
    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await API.delete(`products/${id}/`);
            alert("Product deleted ✅");
            fetchProducts();
        } catch (err) {
            console.log("Delete error:", err);
            alert("Delete failed");
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", background: "#f5f6fa" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Products</h2>

                {/* 👨‍💼 ADMIN: Add Product */}
                {role === "admin" && (
                    <div style={styles.adminBox}>
                        <h3 style={{ marginBottom: "15px" }}>Add Product</h3>
                        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                            <input
                                type="text"
                                placeholder="Product name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                style={styles.input}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                style={styles.input}
                            />
                            <button onClick={createProduct} style={styles.addBtn}>
                                Add Product
                            </button>
                        </div>
                    </div>
                )}

                {/* 🛒 PRODUCT GRID */}
                <div style={styles.grid}>
                    {products.map((p) => (
                        <div key={p.id} style={styles.card}>
                            <h4 style={styles.title}>{p.name}</h4>
                            <p style={styles.price}>₹{p.price}</p>

                            <div style={styles.actions}>
                                {/* Customer */}
                                {role === "customer" && (
                                    <button onClick={() => addToCart(p)} style={styles.addBtn}>
                                        🛒 Add to Cart
                                    </button>
                                )}

                                {/* Admin */}
                                {role === "admin" && (
                                    <button onClick={() => deleteProduct(p.id)} style={styles.deleteBtn}>
                                        🗑 Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    card: {
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    title: { color: "#2f3542", marginBottom: "10px" },
    price: { fontWeight: "bold", color: "#57606f" },
    actions: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "12px" },
    btn: {
        padding: "10px 15px",
        border: "none",
        background: "linear-gradient(90deg, #1e90ff, #3742fa)",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
    },
    deleteBtn: {
        padding: "10px 15px",
        border: "none",
        background: "#ff4757",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
    },
    addBtn: {
        padding: "10px 20px",
        background: "linear-gradient(90deg, #2ed573, #1e90ff)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        flex: "1",
        minWidth: "150px",
    },
    adminBox: {
        marginBottom: "30px",
        padding: "20px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
};

export default Products;