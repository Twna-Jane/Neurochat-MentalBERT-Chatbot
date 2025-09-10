import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    roleDescription: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Admin signup data:", form);
    navigate("/dashboard/admin");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center pt-20"
      style={{ backgroundImage: "url('/admin-bg.jpeg')" }}
    >
      <div className="w-full max-w-md bg-white/90 p-6 rounded-2xl shadow-md relative">
        <span
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-s cursor-pointer hover:text-red-600"
        >
          ← Back
        </span>

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          <input type="text" name="organization" placeholder="Organization" value={form.organization} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          <input type="text" name="roleDescription" placeholder="Role Description" value={form.roleDescription} onChange={handleChange} className="w-full p-2 border rounded-lg" />

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded-lg" required />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Signup</button>
        </form>
      </div>
    </div>
  );
}
