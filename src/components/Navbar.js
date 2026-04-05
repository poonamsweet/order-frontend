import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username"); // 🔥 get username

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav style={styles.navbar}>
            {/* Logo / App Name */}
            <h3
                onClick={() => navigate("/dashboard")}
                style={{ cursor: "pointer", margin: 0 }}
            >
                🛒 Order App
            </h3>

            {/* Links */}
            <div style={styles.links}>
                {/* Customer */}
                {role === "customer" && (
                    <>
                        <span onClick={() => navigate("/products")} style={styles.link}>
                            Products
                        </span>
                        <span onClick={() => navigate("/cart")} style={styles.link}>
                            🛒 Cart
                        </span>
                        <span onClick={() => navigate("/orders")} style={styles.link}>
                            My Orders
                        </span>
                    </>
                )}

                {/* Admin */}
                {role === "admin" && (
                    <>
                        <span onClick={() => navigate("/products")} style={styles.link}>
                            Manage Products
                        </span>
                        <span onClick={() => navigate("/orders")} style={styles.link}>
                            All Orders
                        </span>
                    </>
                )}

                {/* Delivery */}
                {role === "delivery" && (
                    <span onClick={() => navigate("/orders")} style={styles.link}>
                        Assigned Orders
                    </span>
                )}

                {/* User Info */}
                <span style={styles.userInfo}>
                    {username} 
                </span>

                {/* Logout */}
                <button onClick={handleLogout} style={styles.logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#1f2937",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    link: {
        cursor: "pointer",
        padding: "6px 10px",
        borderRadius: "6px",
        transition: "background 0.2s",
    },
    userInfo: {
        color: "#ccc",
        fontStyle: "italic",
        marginLeft: "10px",
    },
    logout: {
        marginLeft: "15px",
        padding: "6px 12px",
        background: "#ef4444",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        transition: "opacity 0.2s",
    },
};

export default Navbar;