import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../api/axios";
import loginImage from "../../assets/signin.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", { username, password });

      localStorage.setItem("token", res.data.token);
      navigate("/items");

    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are already logged in on another device.");
      } else {
        alert("Invalid username/password");
      }
    }
  };

  return (
    <div className="login-wrapper">

      <div className="left-side">
        <img src={loginImage} alt="login" />
      </div>

      <div className="right-side">
        <div className="glass-card">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue shopping</p>

          <form onSubmit={handleLogin}>

            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <div className="redirect-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </div>
        </div>
      </div>
    </div>
  );
}
