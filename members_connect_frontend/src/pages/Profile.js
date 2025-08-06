import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Profile() {
  const { user, token } = useAuth();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, company: user.company || "" });
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/me", form, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Update failed.");
    }
  };

  if (!form) return <div>Loading...</div>;
  return (
    <div style={{ maxWidth: 440, margin: "3em auto", background: "var(--bg-secondary)", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", padding: 32 }}>
      <h2>My Profile</h2>
      {message && <div style={{ marginBottom: 14, color: message.startsWith("Profile") ? "green" : "red" }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input name="email" value={form.email} readOnly style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)", background: "#eee" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Company</label>
          <input name="company" value={form.company} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--border-color)" }} />
        </div>
        <button type="submit" className="btn" style={{ background: "var(--button-bg)", color: "var(--button-text)", border: "none", borderRadius: 6, padding: 10, fontWeight: 700 }}>Update</button>
      </form>
    </div>
  );
}

export default Profile;
