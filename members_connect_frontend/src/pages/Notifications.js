import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Notifications() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/notifications", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  }, [token]);
  if (!items.length) return <div style={{margin:"3em auto",maxWidth:540}}>No notifications.</div>;
  return (
    <div style={{maxWidth:540,margin:"2em auto"}}>
      <h2>Notifications</h2>
      <ul>
        {items.map(n => <li key={n.id}>{n.message} <span style={{ color: "#888", marginLeft:8 }}>{n.created_at ? new Date(n.created_at).toLocaleString() : ""}</span></li>)}
      </ul>
    </div>
  );
}
export default Notifications;
