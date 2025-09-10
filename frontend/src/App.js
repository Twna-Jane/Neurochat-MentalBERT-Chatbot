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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Public pages */}
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
        </Route>
      </Routes>
    </Router>
  );
}
