import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Referrals() {
  const { token, user } = useAuth();
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ to: "", details: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/referrals/sent", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSent(res.data));
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/referrals/received", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setReceived(res.data));
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/members", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMembers(res.data));
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/referrals/send", {
        to_member_id: form.to,
        details: form.details,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg("Referral sent!");
    } catch {
      setMsg("Failed to send referral.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2em auto", textAlign: "left" }}>
      <h2>Referrals</h2>
      <h3>Send Referral</h3>
      {msg && <div style={{ color: msg.includes("sent") ? "green" : "red", marginBottom: 10 }}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <select required name="to" value={form.to} onChange={handleChange} style={{ marginRight: 8 }}>
          <option value="">--To Member--</option>
          {members.filter(m => m.id !== user?.id).map(m => <option value={m.id} key={m.id}>{m.name} ({m.company})</option>)}
        </select>
        <input required name="details" placeholder="Referral details" value={form.details} onChange={handleChange} style={{ marginRight: 8 }} />
        <button type="submit">Send</button>
      </form>
      <div style={{ display: "flex", gap: "2em" }}>
        <div style={{ flex: 1 }}>
          <h4>Referrals You Sent</h4>
          <ul>
            {sent.map(r => (
              <li key={r.id}>{r.details} — to {r.to_member_name}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Referrals You Received</h4>
          <ul>
            {received.map(r => (
              <li key={r.id}>{r.details} — from {r.from_member_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Referrals;
