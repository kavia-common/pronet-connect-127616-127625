import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Meetings() {
  const { token, user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ with: "", when: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/meetings", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMeetings(res.data));
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/members", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMembers(res.data));
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/meetings/schedule", {
        with_member_id: form.with,
        when: form.when,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg("Meeting scheduled!");
    } catch {
      setMsg("Failed to schedule meeting.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2em auto", textAlign: "left" }}>
      <h2>Meetings</h2>
      <h3>Schedule Meeting</h3>
      {msg && <div style={{ color: msg.includes("scheduled") ? "green" : "red", marginBottom: 10 }}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <select required name="with" value={form.with} onChange={handleChange} style={{ marginRight: 8 }}>
          <option value="">--With Member--</option>
          {members.filter(m => m.id !== user?.id).map(m => <option value={m.id} key={m.id}>{m.name} ({m.company})</option>)}
        </select>
        <input required name="when" type="datetime-local" value={form.when} onChange={handleChange} style={{ marginRight: 8 }} />
        <button type="submit">Schedule</button>
      </form>
      <h4>Scheduled Meetings</h4>
      <ul>
        {meetings.map(m => (
          <li key={m.id}>{m.when} — with {m.with_member_name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Meetings;
