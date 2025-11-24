import React, { useState } from "react";
import { Card,CardHeader,CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";

const BiasAudit = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [auditResults, setAuditResults] = useState([
    { id: 12, status: "Passed ✅", date: "Nov 19, 2025", notes: "No bias detected across gender or ethnicity." },
    { id: 11, status: "Minor Gender Bias ⚠️", date: "Nov 10, 2025", notes: "Slight imbalance in sentiment responses." },
  ]);

  const handleRunAudit = () => {
    setIsRunning(true);

    // Simulate API call for bias audit
    setTimeout(() => {
      const newAudit = {
        id: auditResults.length + 1,
        status: Math.random() > 0.5 ? "Passed ✅" : "Potential Bias ⚠️",
        date: new Date().toLocaleDateString(),
        notes:
          Math.random() > 0.5
            ? "No significant bias found."
            : "Detected small bias in response tone across demographics.",
      };
      setAuditResults([newAudit, ...auditResults]);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🧠 AI Bias Audit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            The Bias Audit tool evaluates chatbot outputs for potential algorithmic bias.
            It checks datasets and response patterns to ensure fairness, inclusivity, and neutrality.
          </p>

          <div className="flex items-center gap-3">
            <Button disabled={isRunning} onClick={handleRunAudit}>
              {isRunning ? "Running Audit..." : "Run New Audit"}
            </Button>
            {isRunning && <span className="text-xs text-gray-500">⏳ Please wait, analyzing responses...</span>}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800">Recent Audits</h3>
            <ul className="mt-3 space-y-2">
              {auditResults.map((audit) => (
                <li
                  key={audit.id}
                  className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition text-sm text-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Bias Audit #{audit.id} – {audit.status}
                    </span>
                    <span className="text-xs text-gray-500">{audit.date}</span>
                  </div>
                  <p className="text-xs mt-1 text-gray-600">{audit.notes}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiasAudit;
