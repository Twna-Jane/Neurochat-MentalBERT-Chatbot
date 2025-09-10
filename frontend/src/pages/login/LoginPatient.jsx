import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Login data:", form);

    // TODO: verify credentials with backend
    navigate("/dashboard/main"); // Patient dashboard
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/patient-bg.jpeg')" }}
    >
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 hover:underline mb-4"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Patient Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup/patient")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
