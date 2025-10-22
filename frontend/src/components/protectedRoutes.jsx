import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in → check what route was requested
    if (allowedRoles && allowedRoles.includes("patient")) {
      return <Navigate to="/login/patient" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but with wrong role
    return <Navigate to="/unauthorized" replace />;
  }

  // Everything OK → render the page
  return children;
};

export default ProtectedRoute;
