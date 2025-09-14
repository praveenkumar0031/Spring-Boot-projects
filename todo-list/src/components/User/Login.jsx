import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthService from "../../services/AuthService"; 
import './Log.css';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // call API
      const token = await AuthService.loginUser(email, password );
      //console.log(token);

      // store token
      localStorage.setItem("token", token);
      //console.warn(localStorage.token);

      // redirect to todos
      navigate("/todos");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
  <h2 className="login-title">Login</h2>
  <form onSubmit={handleLogin} className="login-form">
    <div className="login-field">
      <label className="login-label">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="login-input"
      />
    </div>

    <div className="login-field">
      <label className="login-label">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
        className="login-input"
      />
    </div>

    {error && <p className="login-error">{error}</p>}

    <button type="submit" className="login-button">
      Login
    </button>
    <div className="register-login-text">
          don't have an account?{" "}
          <Link to="/register" className="register-link">
            Sign-up here
          </Link>
          <p>forget password{" "}
            <Link to="/forget-password" className="register-link">
            recover acc
          </Link>
          </p>
          
        </div>
  </form>
</div>

  );
};

export default Login;
