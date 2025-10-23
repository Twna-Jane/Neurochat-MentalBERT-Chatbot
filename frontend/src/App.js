import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./pages/Home";

// ===================== LOGIN PAGES =====================
import LoginPatient from "./pages/login/LoginPatient";
import LoginClinician from "./pages/login/LoginClinician";
import LoginAdmin from "./pages/login/LoginAdmin";

// ===================== SIGNUP PAGES =====================
import SignupPatient from "./pages/signup/SignupPatient";
import SignupClinician from "./pages/signup/SignupClinician";
import SignupAdmin from "./pages/signup/SignupAdmin";

// ===================== PASSWORD RESET =====================
import RequestReset from "./pages/requestReset";
import ResetPassword from "./pages/resetPassword";

// ===================== PROTECTED ROUTES =====================
import ProtectedRoute from "./components/protectedRoutes";
import Unauthorized from "./pages/Unauthorized";

// ===================== CHAT + PATIENT =====================
import ChatInterface from "./pages/chatInterface";
import PatientProfile from "./pages/patientProfile";

// ===================== ADMIN DASHBOARD =====================
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminOverview from "./pages/admin/overview";
import AdminSettings from "./pages/admin/settings";
import BiasAudit from "./pages/admin/biasAudit";
import Security from "./pages/admin/security";
import Reports from "./pages/admin/reports";
import AdminProfile from "./pages/admin/profile";

// ===================== CLINICIAN DASHBOARD =====================
import ClinicianDashboard from "./pages/clinician/clinicianDashboard";
import ClinicianOverview from "./pages/clinician/overview";
import ClinicianSessions from "./pages/clinician/sessions";
import ClinicianPatients from "./pages/clinician/patients";
import ClinicianInsights from "./pages/clinician/insights";
import ClinicianSettings from "./pages/clinician/settings";
import ClinicianProfile from "./pages/clinician/profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===================== PUBLIC ROUTES ===================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ---------- LOGIN ROUTES ---------- */}
          <Route path="/login/patient" element={<LoginPatient />} />
          <Route path="/login/clinician" element={<LoginClinician />} />
          <Route path="/login/admin" element={<LoginAdmin />} />

          {/* ---------- SIGNUP ROUTES ---------- */}
          <Route path="/signup/patient" element={<SignupPatient />} />
          <Route path="/signup/clinician" element={<SignupClinician />} />
          <Route path="/signup/admin" element={<SignupAdmin />} />

          {/* ---------- PASSWORD RESET ---------- */}
          <Route path="/request-reset" element={<RequestReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ---------- UNAUTHORIZED ---------- */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ---------- EXAMPLE PROTECTED ROUTE ---------- */}
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

        {/* ===================== CHAT INTERFACE ===================== */}
        <Route path="/chat" element={<ChatInterface />} />

        {/* ===================== PATIENT PROFILE ===================== */}
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
          {/* Default route (index) */}
          <Route index element={<AdminOverview />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="bias-audit" element={<BiasAudit />} />
          <Route path="security" element={<Security />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* ===================== CLINICIAN DASHBOARD ===================== */}
        <Route
          path="/clinician/"
          element={
            <ProtectedRoute allowedRoles={["clinician"]}>
              <ClinicianDashboard />
            </ProtectedRoute>
          }
        >
          {/* Default route (index) */}
          <Route index element={<ClinicianOverview />} />
          <Route path="overview" element={<ClinicianOverview />} />
          <Route path="sessions" element={<ClinicianSessions />} />
          <Route path="patients" element={<ClinicianPatients />} />
          <Route path="insights" element={<ClinicianInsights />} />
          <Route path="settings" element={<ClinicianSettings />} />
          <Route path="profile" element={<ClinicianProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}
