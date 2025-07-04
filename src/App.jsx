import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import StatForm from "./StatForm";
import NavBar from "./NavBar";
import { getStats, saveStats } from "./utils/localStorage";
import { clearAllStats } from "./utils/clearLocalStorage";

const PAGES = {
  LOGIN: "login",
  DASHBOARD: "dashboard",
  STAT_FORM: "stat_form"
};

export default function App() {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Check for ?reset param in the URL and clear stats if present
    if (window.location.search.includes('reset')) {
      clearAllStats();
      setStats([]);
      setIsLoggedIn(false);
      setPage(PAGES.LOGIN);
      window.history.replaceState({}, '', window.location.pathname);
    } else {
      setStats(getStats());
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "test123") {
      setIsLoggedIn(true);
      setPage(PAGES.DASHBOARD);
    } else {
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage(PAGES.LOGIN);
  };

  const handleAddStat = () => {
    setEditingStat(null);
    setPage(PAGES.STAT_FORM);
  };

  const handleEditStat = (stat) => {
    setEditingStat(stat);
    setPage(PAGES.STAT_FORM);
  };

  const handleSaveStat = (stat) => {
    let updatedStats;
    if (stat.id) {
      updatedStats = stats.map((s) => (s.id === stat.id ? stat : s));
    } else {
      stat.id = Date.now();
      updatedStats = [stat, ...stats];
    }
    setStats(updatedStats);
    saveStats(updatedStats);
    setPage(PAGES.DASHBOARD);
  };

  const handleDeleteStat = (id) => {
    const updatedStats = stats.filter((s) => s.id !== id);
    setStats(updatedStats);
    saveStats(updatedStats);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <NavBar
        onNavigate={setPage}
        onLogout={handleLogout}
        currentPage={page}
      />
      <div className="main-content">
        {page === PAGES.DASHBOARD && (
          <Dashboard
            stats={stats}
            onAddStat={handleAddStat}
            onEditStat={handleEditStat}
            onDeleteStat={handleDeleteStat}
          />
        )}
        {page === PAGES.STAT_FORM && (
          <StatForm
            onSave={handleSaveStat}
            onCancel={() => setPage(PAGES.DASHBOARD)}
            editingStat={editingStat}
          />
        )}
      </div>
    </div>
  );
}
