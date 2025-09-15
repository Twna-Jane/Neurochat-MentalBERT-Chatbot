import { useState } from "react";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient"); // default role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/password/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }), 
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Request Password Reset</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* New dropdown for role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="patient">Patient</option>
          <option value="clinician">Clinician</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Send Reset Link
        </button>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
