// src/components/ForgetPassword.js
import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import "./Forget.css"; // Import CSS file

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [favourite, setFavourite] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await AuthService.forgetPassword(email, favourite, newPassword);
      setMessage("✅ Password reset successful!");
      setTimeout(() => navigate("/login"), 1500); 
    } catch (error) {
      setMessage(error.response?.data || "❌ Password reset failed!");
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
        <h2 className="forget-title">🔑 Reset Password</h2>
        <form onSubmit={handleReset} className="forget-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="forget-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your favourite answer"
            className="forget-input"
            value={favourite}
            onChange={(e) => setFavourite(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password"
            className="forget-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="forget-btn">
            Reset Password
          </button>
        </form>
        {message && <p className="forget-message">{message}</p>}

        <div className="forget-footer">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="forget-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
