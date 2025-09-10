import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-16 px-6 pt-20">
        <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Learn more about <span className="font-semibold">Neurochat</span>, our
          mission, our team, and our vision for the future of healthcare
          communication.
        </p>
      </div>

      {/* Info Sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-16">
        {/* Mission */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            At Neurochat, our mission is to bridge the gap between technology
            and healthcare through secure, seamless, and effective communication
            tools that support both clinicians and patients.
          </p>
        </div>

        {/* Team */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p>
            We are a diverse team of developers, clinicians, and researchers
            committed to building innovative solutions that empower healthcare
            providers and improve patient outcomes.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-md transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p>
            We envision a future where healthcare communication is smarter,
            faster, and more human-centered — improving outcomes, saving time,
            and strengthening trust.
          </p>
        </div>
      </div>
    </div>
  );
}
