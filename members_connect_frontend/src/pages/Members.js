import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Members() {
  const { token, user } = useAuth();
  const [members, setMembers] = useState([]);
  const [requesting, setRequesting] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/members", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMembers(res.data))
      .catch(() => setMembers([]));
  }, [token]);

  const sendConnect = async (memberId) => {
    setRequesting(req => ({ ...req, [memberId]: true }));
    try {
      await axios.post("https://vscode-internal-37343-beta.beta01.cloud.kavia.ai:3001/connections/request", { member_id: memberId }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg("Connection request sent!");
    } catch {
      setMsg("Could not send request.");
    }
    setRequesting(req => ({ ...req, [memberId]: false }));
  };

  return (
    <div style={{ maxWidth: 850, margin: "2em auto" }}>
      <h2>All Members</h2>
      {msg && <div style={{ marginBottom: 12, color: msg.includes("sent") ? "green" : "red" }}>{msg}</div>}
      <table style={{ width: "100%", background: "var(--bg-secondary)", borderRadius: 10, overflow: "hidden" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Company</th><th>Connect</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.company}</td>
              <td>
                {user?.id !== m.id && (
                  <button onClick={() => sendConnect(m.id)} disabled={requesting[m.id]}>
                    {requesting[m.id] ? "..." : "Connect"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Members;
