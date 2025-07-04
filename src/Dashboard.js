import React, { useState } from "react";

const sportOptions = ["Basketball", "Soccer", "Baseball", "Custom"];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

export default function Dashboard({ stats, onAddStat, onEditStat, onDeleteStat }) {
  const [sportFilter, setSportFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  let filtered = stats;
  if (sportFilter) filtered = filtered.filter(s => s.sport === sportFilter);
  if (dateFrom) filtered = filtered.filter(s => s.date >= dateFrom);
  if (dateTo) filtered = filtered.filter(s => s.date <= dateTo);

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <button onClick={onAddStat} style={{ margin: "16px 0", padding: "8px 16px", background: "#1a73e8", color: "#fff", border: 0, borderRadius: 4, fontWeight: 600 }}>
        Add New Stat Entry
      </button>
      <div style={{ marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <select value={sportFilter} onChange={e => setSportFilter(e.target.value)}>
          <option value="">All Sports</option>
          {sportOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <label>
          From: <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </label>
        <label>
          To: <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </label>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#f1f3f4" }}>
              <th>Date</th>
              <th>Sport</th>
              <th>Stat Type</th>
              <th>Value</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#888" }}>No stats found.</td></tr>
            ) : (
              filtered.map(stat => (
                <tr key={stat.id}>
                  <td>{formatDate(stat.date)}</td>
                  <td>{stat.sport}</td>
                  <td>{stat.statType}</td>
                  <td>{stat.value}</td>
                  <td>{stat.notes}</td>
                  <td>
                    <button onClick={() => onEditStat(stat)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => onDeleteStat(stat.id)} style={{ color: "#c00" }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
