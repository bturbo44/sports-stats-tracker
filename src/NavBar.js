import React from "react";

export default function NavBar({ onNavigate, onLogout, currentPage }) {
  return (
    <nav className="navbar">
      <div style={{ fontWeight: 700, fontSize: 20 }}>MyStatsTracker</div>
      <div className="nav-links">
        <button
          onClick={() => onNavigate("dashboard")}
          style={{ fontWeight: currentPage === "dashboard" ? 700 : 400 }}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate("stat_form")}
          style={{ fontWeight: currentPage === "stat_form" ? 700 : 400 }}
        >
          Add New Stat
        </button>
        <button onClick={onLogout}>Log Out</button>
      </div>
    </nav>
  );
}
