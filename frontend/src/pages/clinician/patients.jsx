// src/pages/clinician/patients.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async (uid) => {
      try {
        const q = query(collection(db, "patients"), where("clinicianId", "==", uid));
        const snap = await getDocs(q);
        setPatients(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchPatients(user.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Patients</CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <p>No patients assigned.</p>
          ) : (
            <ul className="space-y-2">
              {patients.map((p) => (
                <li key={p.id} className="border-b py-2">
                  <p><strong>Name:</strong> {p.name}</p>
                  <p><strong>Email:</strong> {p.email}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
