import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";


const Security = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Security & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Review recent security and compliance checks. Ensure the system 
            adheres to GDPR, HIPAA, and internal data policies.
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div>• GDPR Compliance: ✅ Passed (Oct 2025)</div>
            <div>• HIPAA Compliance: ⚠️ Review required (Sept 2025)</div>
            <div>• Encryption Key Rotation: ✅ Up-to-date</div>
          </div>

          <Button className="mt-3">Run New Security Scan</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
