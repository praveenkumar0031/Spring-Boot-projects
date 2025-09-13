// src/components/Register.js
import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import TodoBoard from "../todoBoard/TodoBoard";
import { Link} from 'react-router-dom';
import './Reg.css';
export default function Register() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favourite, setFavourite] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.registerUser(email, password, favourite);
      
      setMessage("User registered successfully!");
      navigate("/login");
      
    } catch (error) {

      setMessage(error.response?.data || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Favourite Answer"
          className="register-input"
          value={favourite}
          onChange={(e) => setFavourite(e.target.value)}
        />
        <button type="submit" className="register-btn">
          Sign Up
        </button>
        <p className="register-login-text">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login here
          </Link>
        </p>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
}
