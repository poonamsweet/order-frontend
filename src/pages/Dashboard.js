import Navbar from "../components/Navbar";

function Dashboard() {
  const role = localStorage.getItem("role");

  // Role-based panels
  const panels = {
    admin: {
      title: "👨‍💼 Admin Panel",
      desc: "Manage products, assign deliveries, and monitor all orders",
      color: "#1e90ff",
    },
    customer: {
      title: "👤 Customer Panel",
      desc: "Browse products, add to cart, and place orders",
      color: "#2ed573",
    },
    delivery: {
      title: "🚴 Delivery Panel",
      desc: "View assigned orders and update delivery status",
      color: "#ffb142",
    },
  };

  const panel = panels[role];

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          background: "#f5f6fa",
          minHeight: "80vh",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
          Dashboard
        </h2>

        {panel && (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              padding: "30px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              borderTop: `6px solid ${panel.color}`,
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <h3 style={{ color: panel.color, marginBottom: "15px" }}>{panel.title}</h3>
            <p style={{ color: "#57606f", fontSize: "16px" }}>{panel.desc}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;