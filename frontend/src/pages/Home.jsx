import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 min-h-[80vh] pt-20">
        <h1 className="text-6xl font-bold mb-6">Welcome to Neurochat</h1>
        <p className="text-xl mb-10 max-w-3xl leading-relaxed">
          Neurochat is a <span className="font-semibold">smart mental health platform</span> 
          that connects <span className="font-semibold">patients, clinicians, and administrators</span> 
          in a secure and supportive environment.  
          Using the power of <span className="font-semibold">MentalBERT AI</span>, Neurochat 
          helps screen for signs of depression, provides self-care resources, and 
          makes it easier for clinicians to monitor and support patients.  
          Our mission is to make mental health care more <span className="italic">accessible, 
          personalized, and effective</span>.
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
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Neurochat?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-xl shadow text-center hover:shadow-lg shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            <img
              src="https://img.icons8.com/color/96/artificial-intelligence.png"
              alt="AI Support"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-3">AI-Powered Screening</h3>
            <p>
              Built on <strong>MentalBERT</strong>, our chatbot engages patients in 
              conversations, helps identify early signs of depression, and 
              guides them toward professional care and self-help resources.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow text-center hover:shadow-lg shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            <img
              src="https://img.icons8.com/color/96/doctor-male.png"
              alt="Clinician"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-3">Clinician Dashboard</h3>
            <p>
              Mental health professionals get <strong>real-time insights</strong> 
              into patient well-being, can track progress, and communicate securely 
              to deliver personalized, data-driven support.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow text-center hover:shadow-lg shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            <img
              src="https://img.icons8.com/color/96/admin-settings-male.png"
              alt="Admin"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-3">Admin Tools</h3>
            <p>
              Administrators can manage user accounts, monitor system usage, 
              and ensure compliance with data protection standards for a 
              safe and trusted platform.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-6 bg-indigo-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Your Mental Health Matters</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
          Whether you’re a patient seeking support, a clinician providing care, 
          or an admin managing the system, Neurochat is here to make mental 
          health conversations easier, faster, and more effective.
        </p>
        <Link
          to="/signup/patient"
          className="px-8 py-3 rounded-2xl bg-white text-indigo-600 font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Join Neurochat Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Neurochat. All rights reserved.</p>
      </footer>
    </div>
  );
}
