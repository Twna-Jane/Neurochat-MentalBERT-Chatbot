import Navbar from "./Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="mb-6 text-lg">
          We’d love to hear from you! Whether you have a question, feedback, or
          partnership inquiry, feel free to reach out.
        </p>

        {/* Contact Form */}
        <form className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 text-black"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 text-black"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 text-black"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8">
          <p className="text-lg">📧 Email: support@neurochat.com</p>
          <p className="text-lg">📞 Phone: +254 700 123 456</p>
        </div>
      </div>
    </div>
  );
}
