import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./pages/Home";

// Login pages
import LoginPatient from "./pages/login/LoginPatient";
import LoginClinician from "./pages/login/LoginClinician";
import LoginAdmin from "./pages/login/LoginAdmin";

// Signup pages
import SignupPatient from "./pages/signup/SignupPatient";
import SignupClinician from "./pages/signup/SignupClinician";
import SignupAdmin from "./pages/signup/SignupAdmin";

// Reset password
import RequestReset from "./pages/requestReset";
import ResetPassword from "./pages/resetPassword";

// Protected Route + Unauthorized
import ProtectedRoute from "./components/protectedRoutes";
import Unauthorized from "./pages/Unauthorized";

// Chatbot Interface
import ChatInterface from "./pages/chatInterface";
import PatientProfile from "./pages/patientProfile";

// Admin Dashboard and nested pages
import AdminDashboard from "./pages/admin/adminDashboard";
import Overview from "./pages/admin/overview";
import SettingsPage from "./pages/admin/settings";
import BiasAudit from "./pages/admin/biasAudit";
import Security from "./pages/admin/security";
import Reports from "./pages/admin/reports";
import Profile from "./pages/admin/profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Layout for general pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login routes */}
          <Route path="/login/patient" element={<LoginPatient />} />
          <Route path="/login/clinician" element={<LoginClinician />} />
          <Route path="/login/admin" element={<LoginAdmin />} />

          {/* Signup routes */}
          <Route path="/signup/patient" element={<SignupPatient />} />
          <Route path="/signup/clinician" element={<SignupClinician />} />
          <Route path="/signup/admin" element={<SignupAdmin />} />

          {/* Reset password routes */}
          <Route path="/request-reset" element={<RequestReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Example protected route */}
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={["admin", "patient", "clinician"]}>
                <h2 className="text-center mt-10 text-indigo-600 font-bold text-xl">
                  This is a protected page
                </h2>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Chatbot Interface (outside layout) */}
        <Route path="/chat" element={<ChatInterface />} />

        {/* Patient Profile (Protected) */}
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        {/* ===================== ADMIN DASHBOARD ===================== */}
        <Route
          path="/admin/"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="bias-audit" element={<BiasAudit />} />
          <Route path="security" element={<Security />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
