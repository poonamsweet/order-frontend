import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("auth/login/", data);

            localStorage.setItem("token", res.data.access);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);


            navigate("/products");
        } catch (err) {
            setMessage("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to your account</p>

                {message && <div className="error">{message}</div>}

                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />

                <button onClick={handleLogin}>Login</button>

                {/* Navigation to Register */}
                <p
                    style={{
                        marginTop: "12px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                    onClick={() => navigate("/register")}
                >
                    Don’t have an account? Register
                </p>
            </div>

        </div>
    );
}

export default Login;