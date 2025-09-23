import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function LoginClinician() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Step 1: Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/clinicians/login`, form);

      if (!res.data.userId) {
        throw new Error("User ID missing from response");
      }

      setUserId(res.data.userId);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${API_BASE}/clinicians/verify`, {
        userId,
        otp,
      });

      // Store role + user details
      const userWithRole = { ...res.data.user, role: "clinician" };
      localStorage.setItem("authUser", JSON.stringify(userWithRole));

      navigate("/dashboard/clinician");
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post(`${API_BASE}/clinicians/resend-otp`, { userId });
      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/clinician-bg.jpeg')" }}
    >
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-indigo-600 hover:underline mb-4"
        >
          ← Back
        </button>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
              Clinician Login
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/request-reset")}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup/clinician")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
              Enter OTP
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Didn’t get the OTP?{" "}
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="text-indigo-600 font-semibold hover:underline disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
