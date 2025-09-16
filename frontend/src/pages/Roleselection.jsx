import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    { name: "Patient", login: "/login/patient", signup: "/signup/patient" },
    { name: "Clinician", login: "/login/clinician", signup: "/signup/clinician" },
    { name: "Admin", login: "/login/admin", signup: "/signup/admin" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Choose Your Role
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.name}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center"
            >
              <h2 className="text-xl font-semibold mb-4">{role.name}</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(role.login)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate(role.signup)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Signup
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
