// src/pages/clinician/sessions.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async (uid) => {
      try {
        const q = query(collection(db, "sessions"), where("clinicianId", "==", uid));
        const snap = await getDocs(q);
        setSessions(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchSessions(user.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p>No scheduled sessions.</p>
          ) : (
            <ul className="space-y-2">
              {sessions.map((s) => (
                <li key={s.id} className="border-b py-2">
                  <p><strong>Patient:</strong> {s.patientName}</p>
                  <p><strong>Date:</strong> {s.date}</p>
                  <p><strong>Time:</strong> {s.time}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sessions;
