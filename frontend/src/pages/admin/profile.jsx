import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged user:", user); // Debug log
      if (user) {
        setUserId(user.uid);
        try {
          const docRef = doc(db, "admins", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setAdminData(docSnap.data());
            setError("");
          } else {
            setError("No profile found for this admin in Firestore.");
          }
        } catch (err) {
          setError("Error fetching admin profile.");
          console.error("Error fetching admin profile:", err);
        }
      } else {
        setError("No authenticated user found.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setError("");
    try {
      const docRef = doc(db, "admins", userId);
      await updateDoc(docRef, {
        name: adminData.name,
        // Add other fields here if you want to allow editing more
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Check console for details.");
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              name="name"
              value={adminData.name}
              onChange={handleChange}
              placeholder="Admin Name"
            />
          </div>
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              value={adminData.email}
              disabled
              placeholder="admin@example.com"
            />
          </div>
          {/* Role (read-only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Input name="role" value={adminData.role} disabled />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;