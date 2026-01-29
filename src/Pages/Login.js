import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import "./Login.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handle(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      toast.success("Login successful", {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      localStorage.setItem("token", response.data.token);

      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="login-page">
        <form className="login-card" onSubmit={handle}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to manage your tasks</p>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span className="forgot" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </span>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
