import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Login pages
import LoginPatient from "../pages/login/LoginPatient";
import LoginClinician from "../pages/login/LoginClinician";
import LoginAdmin from "../pages/login/LoginAdmin";

// Signup pages
import SignupPatient from "../pages/signup/SignupPatient";
import SignupClinician from "../pages/signup/SignupClinician";
import SignupAdmin from "../pages/signup/SignupAdmin";

import ChatInterface from "./pages/chatInterface";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Login routes */}
        <Route path="/login/patients" element={<LoginPatient />} />
        <Route path="/login/clinician" element={<LoginClinician />} />
        <Route path="/login/admin" element={<LoginAdmin />} />

        {/* Signup routes */}
        <Route path="/signup/patients" element={<SignupPatient />} />
        <Route path="/signup/clinician" element={<SignupClinician />} />
        <Route path="/signup/admin" element={<SignupAdmin />} />

        {/* Reset password Routes */}
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Chatbot Interface */}
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
}
