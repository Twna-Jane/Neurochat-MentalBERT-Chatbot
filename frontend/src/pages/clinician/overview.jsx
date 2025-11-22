// src/pages/clinician/overview.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { db, auth } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Overview = () => {
  const [stats, setStats] = useState({
    patients: 0,
    sessions: 0,
    insights: 0,
  });

  useEffect(() => {
    const fetchOverviewData = async (uid) => {
      try {
        const patientsSnap = await getDocs(query(collection(db, "patients"), where("clinicianId", "==", uid)));
        const sessionsSnap = await getDocs(query(collection(db, "sessions"), where("clinicianId", "==", uid)));
        const insightsSnap = await getDocs(query(collection(db, "insights"), where("clinicianId", "==", uid)));

        setStats({
          patients: patientsSnap.size,
          sessions: sessionsSnap.size,
          insights: insightsSnap.size,
        });
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchOverviewData(user.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Object.entries(stats).map(([key, value]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="capitalize">{key}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
