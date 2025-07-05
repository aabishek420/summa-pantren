import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginBackend } from "../utils/api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const idToken = await userCredential.user.getIdToken();
      const backendMsg = await loginBackend(idToken);
      setMessage(backendMsg);
      if (backendMsg.startsWith("Login successful")) {
        onLogin(idToken, form.email);
      }
    } catch (err) {
      setMessage("Login failed: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-100"
      style={{ maxWidth: "350px", minWidth: "280px" }}
    >
       <h1 className="text-black text-center font-sans">Login</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </form>
  );
}
