import React, { useState } from "react";

const sportOptions = ["Basketball", "Soccer", "Baseball", "Custom"];

export default function StatForm({ onSave, onCancel, editingStat }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(editingStat?.date || today);
  const [sport, setSport] = useState(editingStat?.sport || "Basketball");
  const [statType, setStatType] = useState(editingStat?.statType || "");
  const [value, setValue] = useState(editingStat?.value || "");
  const [notes, setNotes] = useState(editingStat?.notes || "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!statType || value === "") return;
    onSave({
      id: editingStat?.id,
      date,
      sport,
      statType,
      value: Number(value),
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 8, maxWidth: 400, margin: "0 auto" }}>
      <h2>{editingStat ? "Edit Stat Entry" : "Add New Stat Entry"}</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Date<br />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Sport<br />
          <select value={sport} onChange={e => setSport(e.target.value)} style={{ width: "100%", padding: 8 }}>
            {sportOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Stat Type<br />
          <input type="text" value={statType} onChange={e => setStatType(e.target.value)} required style={{ width: "100%", padding: 8 }} placeholder="e.g. Points, Assists, Runs" />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Value<br />
          <input type="number" value={value} onChange={e => setValue(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Notes (optional)<br />
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{ width: "100%", padding: 8 }} />
        </label>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ background: "#eee", padding: "8px 16px", border: 0, borderRadius: 4 }}>Cancel</button>
        <button type="submit" style={{ background: "#1a73e8", color: "#fff", padding: "8px 16px", border: 0, borderRadius: 4, fontWeight: 600 }}>{editingStat ? "Save" : "Add"}</button>
      </div>
    </form>
  );
}
