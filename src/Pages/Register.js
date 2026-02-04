//Register page:

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Register.css";

export default function Register() {
  const [isCheked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function handle(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );
      toast.success(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsChecked(false);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        // toast.error("Server error");
        toast.error(err.response?.data?.error || "Server error");
      }
    }
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="register-page">
        <form className="register-card" onSubmit={handle}>
          <h2>Create Account</h2>
          <p className="subtitle">Sign up to manage your task reminders</p>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="terms">
            <input
              type="checkbox"
              checked={isCheked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <span>I agree to the Terms & Conditions</span>
          </div>

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
