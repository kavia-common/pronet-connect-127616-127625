import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok) {
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "3em auto", background: "var(--bg-secondary)", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", padding: 32 }}>
      <h2 style={{ marginBottom: 16 }}>Login</h2>
      {error && <div style={{ color: "red", marginBottom: 14 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", background: "var(--button-bg)", color: "var(--button-text)", border: "none", borderRadius: 6, padding: 10, fontWeight: 700, fontSize: "1rem" }}>Login</button>
        <div style={{ marginTop: 14 }}>
          <span>Don't have an account? <Link to="/register">Register</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
