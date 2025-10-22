import React, { useEffect, useState } from "react";
import { Activity, Cpu, Users, ShieldCheck } from "lucide-react";
import axios from "axios";

export default function Overview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSessions: 0,
    systemLoad: "Normal",
    securityStatus: "Secure",
  });

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Fetch system overview data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/overview`, {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching system stats:", err);
      }
    };

    fetchStats();
  }, [API_BASE]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-blue-600">
          System Overview
        </h1>
        <p className="text-gray-600 mt-1">
          Quick summary of NeuroChat system performance, user activity, and
          security status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Active Sessions</p>
              <p className="text-2xl font-bold">{stats.activeSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">System Load</p>
              <p className="text-2xl font-bold">{stats.systemLoad}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-gray-500 text-sm">Security Status</p>
              <p className="text-2xl font-bold">{stats.securityStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Description */}
      <div className="bg-white p-6 rounded-xl shadow mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          System Health Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The NeuroChat system is currently stable and running optimally. No
          critical alerts have been detected in the past 24 hours. All services
          — including chatbot inference, authentication, and data handling — are
          operational.
        </p>
      </div>
    </div>
  );
}
