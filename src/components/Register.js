import React, { useState } from "react";
import { registerUser } from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneno: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMessage(typeof res === "string" ? res : JSON.stringify(res));
  };

  return (
    
    <form
      onSubmit={handleSubmit}
      className="w-100"
      style={{ maxWidth: "350px", minWidth: "280px" }}
    > 
  <h1 className="text-black text-center font-sans">Create Account</h1>


      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          className="form-control"
          placeholder="Enter your name"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phoneno" className="form-label">
          Phone No
        </label>
        <input
          id="phoneno"
          name="phoneno"
          className="form-control"
          placeholder="Enter phone number"
          value={form.phoneno}
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
          name="password"
          type="password"
          className="form-control"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary w-100" type="submit">
        Register
      </button>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </form>
  );
}
