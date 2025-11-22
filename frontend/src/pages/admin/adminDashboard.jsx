import React from "react";
import {
  BarChart3,
  Settings,
  Shield,
  FileText,
  User,
  Brain,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login/admin");
  };

  const menuItems = [
    { name: "Dashboard", icon: <BarChart3 />, path: "overview" },
    { name: "System Settings", icon: <Settings />, path: "settings" },
    { name: "Bias Audit", icon: <Brain />, path: "bias-audit" },
    { name: "Security & Compliance", icon: <Shield />, path: "security" },
    { name: "Reports", icon: <FileText />, path: "reports" },
    { name: "Profile", icon: <User />, path: "profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 text-blue-400" : ""
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
        <Outlet />
      </main>
    </div>
  );
}
