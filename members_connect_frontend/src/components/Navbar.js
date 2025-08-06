import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
function Navbar({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" style={{
      background: "var(--bg-secondary)",
      padding: "0.8rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--border-color)",
      marginBottom: "2rem"
    }}>
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "var(--text-primary)", fontWeight: 700, fontSize: "1.3rem" }}>
          ProNet Connect
        </Link>
        {user && (
          <>
            <Link to="/members" style={{ margin: "0 1em", color: "var(--text-primary)" }}>Members</Link>
            <Link to="/referrals" style={{ margin: "0 1em", color: "var(--text-primary)" }}>Referrals</Link>
            <Link to="/meetings" style={{ margin: "0 1em", color: "var(--text-primary)" }}>Meetings</Link>
            <Link to="/notifications" style={{ margin: "0 1em", color: "var(--text-primary)" }}>Notifications</Link>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="theme-toggle" style={{marginRight: "0.5rem"}} onClick={onToggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user ? (
          <>
            <Link to="/profile" style={{ marginRight: 10, color: "var(--text-primary)" }}>
              Profile
            </Link>
            <button className="btn btn-outline" onClick={logout} style={{
              background: "none",
              color: "var(--button-bg)",
              border: "1px solid var(--button-bg)",
              borderRadius: "10px",
              padding: "4px 12px",
              cursor: "pointer",
              fontWeight: 500
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight: 10, color: "var(--text-primary)"}}>Login</Link>
            <Link to="/register" style={{color: "var(--text-secondary)"}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
