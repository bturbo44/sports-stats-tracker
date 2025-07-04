import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    if (!ok) setError("Invalid username or password");
  };

  return (
    <div style={{ maxWidth: 350, margin: "4rem auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ textAlign: "center" }}>MyStatsTracker Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            autoFocus
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            required
          />
        </div>
        {error && <div style={{ color: "#c00", marginBottom: 10 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#1a73e8", color: "#fff", border: 0, borderRadius: 4, fontWeight: 600 }}>
          Login
        </button>
      </form>
    </div>
  );
}
