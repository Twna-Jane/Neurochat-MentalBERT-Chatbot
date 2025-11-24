import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowLeft } from "lucide-react";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Ensure session persistence (optional, but helps with auth issues)
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.error("Error setting persistence:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user);
      if (!user) {
        setError("You are not logged in. Please log in to view your profile.");
        navigate("/login/patient");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "patients", user.uid));
        if (userDoc.exists()) {
          setPatient(userDoc.data());
          setError("");
        } else {
          setError("No user data found for this account.");
        }
      } catch (err) {
        setError("Error fetching profile.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (!authChecked || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/login/patient")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600 mb-4">Profile not found.</p>
        <button
          onClick={() => navigate("/chat")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Back to Chat
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/chat")}
          className="absolute top-4 left-4 text-gray-500 hover:text-indigo-600"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Profile Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Patient Profile
        </h2>

        {/* Profile Info */}
        <div className="space-y-4">
          <ProfileItem label="Full Name" value={patient.name || "N/A"} />
          <ProfileItem label="Email" value={patient.email || "N/A"} />
          <ProfileItem label="Age" value={patient.age || "N/A"} />
          <ProfileItem label="Gender" value={patient.gender || "N/A"} />
          <ProfileItem label="Demographic" value={patient.demographic || "N/A"} />
          <ProfileItem label="Password" value="********" />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/chat")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Back to Chat
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default PatientProfile;