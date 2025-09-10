import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 min-h-[80vh] pt-20">
        <h1 className="text-6xl font-bold mb-6">Welcome to Neurochat</h1>
        <p className="text-xl mb-10 max-w-2xl">
          An intelligent mental health chatbot powered by{" "}
          <span className="font-semibold">MentalBERT</span>. Connect with
          clinicians, patients, and administrators in one secure platform.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <Link
            to="/signup/patient"
            className="px-6 py-3 rounded-2xl bg-white text-indigo-600 font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login/patient"
            className="px-6 py-3 rounded-2xl border border-white font-semibold shadow-md hover:bg-white hover:text-indigo-600 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-10">Why Neurochat?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
            <img
              src="https://img.icons8.com/color/96/artificial-intelligence.png"
              alt="AI Support"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">AI-Powered Support</h3>
            <p>Leverages MentalBERT to screen for depression and provide resources.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
            <img
              src="https://img.icons8.com/color/96/doctor-male.png"
              alt="Clinician"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Clinician Dashboard</h3>
            <p>Provides mental health professionals with useful insights.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
            <img
              src="https://img.icons8.com/color/96/admin-settings-male.png"
              alt="Admin"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Admin Controls</h3>
            <p>Admins can manage users, monitor activity, and ensure compliance.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Neurochat. All rights reserved.</p>
      </footer>
    </div>
  );
}
