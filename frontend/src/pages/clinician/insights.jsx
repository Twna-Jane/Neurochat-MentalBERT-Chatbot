// src/pages/clinician/insights.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Insights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async (uid) => {
      try {
        const q = query(collection(db, "insights"), where("clinicianId", "==", uid));
        const snap = await getDocs(q);
        setInsights(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchInsights(user.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <Card key={insight.id}>
          <CardHeader>
            <CardTitle>{insight.patientName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{insight.summary || "No summary provided."}</p>
            <p className="text-sm text-gray-500 mt-2">Date: {insight.date}</p>
          </CardContent>
        </Card>
      ))}
      {insights.length === 0 && <p>No insights available yet.</p>}
    </div>
  );
};

export default Insights;
