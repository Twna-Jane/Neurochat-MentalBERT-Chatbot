import { useState } from "react";

export default function AuthForm({ type, role, onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "signup" && form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {type === "login" ? `Login as ${role}` : `Signup as ${role}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        {type === "signup" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {type === "login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
}
