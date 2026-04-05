import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    try {
      await API.post("auth/register/", data);

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      // Show actual backend error
      if (err?.response?.data?.detail) {
        setError(err.response.data.detail); // General error message
      } else if (err?.response?.data?.username) {
        setError(err.response.data.username[0]); // Specific username error
      } else if (err?.response?.data?.password) {
        setError(err.response.data.password[0]); // Specific password error
      } else {
        setError("Registration failed. Please try again."); // Fallback error message
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account ✨</h2>
        <p className="subtitle">Register to get started</p>

        {/* ✅ Success Message */}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {success}
          </div>
        )}

        {/* ❌ Error Message */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* Role Selection */}
        <select
          value={data.role}
          onChange={(e) =>
            setData({ ...data, role: e.target.value })
          }
        >
          <option value="customer">Customer</option>
          <option value="delivery">Delivery</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}>
          Register
        </button>

        <p
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;