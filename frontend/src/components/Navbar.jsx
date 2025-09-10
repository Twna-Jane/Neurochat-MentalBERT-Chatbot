import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md shadow-md z-50">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src="/Stethoscope.jpeg" alt="Neurochat Logo" className="h-10 w-10" />
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800"
        >
          Neurochat
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-indigo-200">Home</Link>
        <Link to="/about" className="hover:text-indigo-200">About Us</Link>
        <Link to="/contact" className="hover:text-indigo-200">Contact</Link>

        {/* Login Dropdown */}
        <div className="relative group">
          <button className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
            Login
          </button>
          <div className="absolute hidden group-hover:block right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
            <Link to="/login/patient" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Patient</Link>
            <Link to="/login/clinician" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Clinician</Link>
            <Link to="/login/admin" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Admin</Link>
          </div>
        </div>

        {/* Signup Dropdown */}
        <div className="relative group">
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Signup
          </button>
          <div className="absolute hidden group-hover:block right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
            <Link to="/signup/patient" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Patient</Link>
            <Link to="/signup/clinician" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Clinician</Link>
            <Link to="/signup/admin" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
