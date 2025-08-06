import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1600);
    } else {
      setError("Registration failed. Please try a different email.");
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "3em auto", background: "var(--bg-secondary)", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", padding: 32 }}>
      <h2 style={{ marginBottom: 16 }}>Register</h2>
      {error && <div style={{ color: "red", marginBottom: 14 }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: 14 }}>Registration successful! Redirecting to login...</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: 6 }}>Full Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="company" style={{ display: "block", marginBottom: 6 }}>Company</label>
          <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", background: "var(--button-bg)", color: "var(--button-text)", border: "none", borderRadius: 6, padding: 10, fontWeight: 700, fontSize: "1rem" }}>Register</button>
        <div style={{ marginTop: 14 }}>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Register;
