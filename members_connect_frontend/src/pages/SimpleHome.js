import React from "react";

/**
 * SimpleHome - A minimal demo landing page for development
 * Uses project theme variables for color and layout.
 *
 * Features:
 *  - Top banner with welcome
 *  - User info section (static/dummy)
 *  - Color blocks demonstrating primary/secondary/accent theme usage
 */
function SimpleHome() {
  return (
    <div style={{ maxWidth: 800, margin: "2.5em auto", background: "var(--bg-secondary)", borderRadius: 18, boxShadow: "0 2px 16px rgba(0,0,0,0.09)", padding: 32 }}>
      <header style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: 16, marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "2.15rem", color: "var(--text-primary)" }}>
          Welcome to ProNet Connect
        </h1>
        <div style={{ color: "var(--text-secondary)", marginTop: 4, marginBottom: 6, fontSize: "1.05rem" }}>
          Your hub for networking, referrals, and meetings.
        </div>
      </header>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.28rem", color: "var(--button-bg)", marginTop: 0 }}>Sample User Information</h2>
        <div style={{ fontSize: "1.07em", padding: "12px 0 10px 0" }}>
          <strong>Name:</strong> Jane Smith <br />
          <strong>Email:</strong> jane.smith@example.com <br />
          <strong>Company:</strong> Widget Innovations Ltd.
        </div>
      </section>
      <section>
        <h3 style={{ fontSize: "1.11rem", marginTop: 0 }}>Theme Colors Showcase</h3>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{
            background: "#1867c0", color: "#fff", borderRadius: 12,
            flex: 1, minWidth: 90, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, letterSpacing: 0.4
          }}>Primary</div>
          <div style={{
            background: "#f8bb44", color: "#333", borderRadius: 12,
            flex: 1, minWidth: 90, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600
          }}>Secondary</div>
          <div style={{
            background: "#26a69a", color: "#fff", borderRadius: 12,
            flex: 1, minWidth: 90, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600
          }}>Accent</div>
        </div>
      </section>
      <nav style={{ marginTop: 40, textAlign: 'center' }}>
        <span style={{ color: "var(--text-secondary)", fontSize: "0.98em", marginRight: 16 }}>
          Navigation Demo:
        </span>
        <a href="/" style={{ color: "var(--button-bg)", textDecoration: "underline", marginRight: 12 }}>Dashboard</a>
        <a href="/members" style={{ color: "#1867c0", marginRight: 12 }}>Members</a>
        <a href="/referrals" style={{ color: "#26a69a", marginRight: 12 }}>Referrals</a>
        <a href="/profile" style={{ color: "#f8bb44" }}>Profile</a>
      </nav>
    </div>
  );
}

export default SimpleHome;
