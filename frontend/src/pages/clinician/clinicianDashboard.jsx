import React from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  Activity,
  Settings,
  User,
} from "lucide-react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Overview from "./overview";
import Sessions from "./sessions";
import Patients from "./patients";
import Insights from "./insights";
import SettingsPage from "./settings";
import Profile from "./profile";

export default function ClinicianDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login/clinician");
  };

  const menuItems = [
    { name: "Dashboard", icon: <BarChart3 />, path: "overview" },
    { name: "Sessions", icon: <MessageSquare />, path: "sessions" },
    { name: "Patients", icon: <Users />, path: "patients" },
    { name: "Insights", icon: <Activity />, path: "insights" },
    { name: "Settings", icon: <Settings />, path: "settings" },
    { name: "Profile", icon: <User />, path: "profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-400">Clinician Panel</h2>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 text-green-400" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
          © 2025 NeuroChat
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="patients" element={<Patients />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
