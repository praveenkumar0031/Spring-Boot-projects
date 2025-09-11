// src/components/ForgetPassword.js
import React, { useState } from "react";
import { forgetPassword } from "../../services/AuthService";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [favourite, setFavourite] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword(email, favourite, newPassword);
      setMessage("Password reset successful!");
    } catch (error) {
      setMessage(error.response?.data || "Password reset failed!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Forget Password</h2>
      <form onSubmit={handleReset} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Favourite Answer"
          className="border p-2 w-full"
          value={favourite}
          onChange={(e) => setFavourite(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 w-full rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
