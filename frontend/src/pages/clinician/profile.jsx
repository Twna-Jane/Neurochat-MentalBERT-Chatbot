  // src/pages/clinician/profile.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [clinician, setClinician] = useState({
    name: "",
    email: "",
    specialty: "",
    license: "",
    workplace: "",
  });
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const docRef = doc(db, "clinicians", user.uid);
          const snap = await getDoc(docRef);

          if (snap.exists()) {
            const data = snap.data();
            console.log("Firestore clinician data:", data); // Debug: check what Firestore returns

            setClinician({
              name: data.name || "",
              email: data.email || user.email || "",
              specialty: data.specialty || "",
              license: data.license || "",
              workplace: data.workplace || "",
            });
          } else {
            console.warn("Clinician document not found in Firestore.");
          }
        } catch (err) {
          console.error("Error fetching clinician data:", err);
        }
      } else {
        console.warn("No authenticated user found.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setClinician({ ...clinician, [e.target.name]: e.target.value });
  };

  const handleEditToggle = async () => {
    if (isEditing && uid) {
      try {
        await updateDoc(doc(db, "clinicians", uid), clinician);
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-indigo-700">
            Clinician Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              name="name"
              value={clinician.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              value={clinician.email}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialty</label>
            <Input
              name="specialty"
              value={clinician.specialty}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">License Number</label>
            <Input
              name="license"
              value={clinician.license}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Workplace</label>
            <Input
              name="workplace"
              value={clinician.workplace}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <Button
            onClick={handleEditToggle}
            className="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

