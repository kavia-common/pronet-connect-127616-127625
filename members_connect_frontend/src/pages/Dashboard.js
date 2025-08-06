import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ maxWidth: 900, margin: "2em auto 0", textAlign: "left" }}>
      <h2>Welcome, {user?.name || "member"}!</h2>
      <div style={{ margin: "2em 0", display: "flex", gap: "3em", flexWrap: "wrap" }}>
        <QuickLink to="/members" title="Members" desc="Browse network members, connect and expand your circle" />
        <QuickLink to="/referrals" title="Referrals" desc="Send, receive, track business referrals online" />
        <QuickLink to="/meetings" title="Meetings" desc="View scheduled & upcoming chapter meetings" />
        <QuickLink to="/notifications" title="Notifications" desc="All system alerts and connection requests" />
        <QuickLink to="/profile" title="My Profile" desc="Update your info, company & expertise" />
      </div>
    </div>
  );
}

function QuickLink({ to, title, desc }) {
  return (
    <Link to={to} style={{
      flex: "1 1 200px",
      minWidth: 180,
      background: "var(--bg-secondary)",
      borderRadius: 14,
      textDecoration: "none",
      color: "var(--text-primary)",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      padding: 24,
      transition: "box-shadow .2s",
      margin: "0.5em 0"
    }}>
      <h3 style={{marginTop:0}}>{title}</h3>
      <div style={{color:"var(--text-secondary)", fontSize: "0.98em" }}>{desc}</div>
    </Link>
  );
}

export default Dashboard;
