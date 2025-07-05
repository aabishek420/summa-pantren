// components/ForgotPassword.js
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent. Check your inbox.");
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h3>Reset Your Password</h3>
      <p className="mb-3">Enter your email address to receive a reset link.</p>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary mb-2" onClick={handleReset}>
        Send Reset Email
      </button>

      {/* 🔙 Back to Login Button */}
      <div>
        <button className="btn btn-link mt-2" onClick={onBack}>
          🔙 Back to Login
        </button>
      </div>

      {message && <p className="mt-3 text-info">{message}</p>}
    </div>
  );
}
