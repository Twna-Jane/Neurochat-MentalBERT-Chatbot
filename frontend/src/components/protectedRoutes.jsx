import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but wrong role → redirect to unauthorized page or home
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
