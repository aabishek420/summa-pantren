import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset email sent!");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="my-3">
      <h5>Forgot Password?</h5>
      <form onSubmit={handleReset}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-warning w-100" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
}
