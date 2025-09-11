// src/components/Register.js
import React, { useState } from "react";
import { registerUser } from "../../services/AuthService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favourite, setFavourite] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, favourite);
      setMessage("User registered successfully!");
    } catch (error) {
      setMessage(error.response?.data || "Registration failed!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Favourite Answer"
          className="border p-2 w-full"
          value={favourite}
          onChange={(e) => setFavourite(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
}
