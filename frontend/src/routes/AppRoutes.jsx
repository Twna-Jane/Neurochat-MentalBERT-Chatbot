import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Login pages
import LoginPatient from "../pages/login/LoginPatient";
import LoginClinician from "../pages/login/LoginClinician";
import LoginAdmin from "../pages/login/LoginAdmin";

// Signup pages
import SignupPatient from "../pages/signup/SignupPatient";
import SignupClinician from "../pages/signup/SignupClinician";
import SignupAdmin from "../pages/signup/SignupAdmin";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Login routes */}
        <Route path="/login/patient" element={<LoginPatient />} />
        <Route path="/login/clinician" element={<LoginClinician />} />
        <Route path="/login/admin" element={<LoginAdmin />} />

        {/* Signup routes */}
        <Route path="/signup/patient" element={<SignupPatient />} />
        <Route path="/signup/clinician" element={<SignupClinician />} />
        <Route path="/signup/admin" element={<SignupAdmin />} />
      </Routes>
    </Router>
  );
}
