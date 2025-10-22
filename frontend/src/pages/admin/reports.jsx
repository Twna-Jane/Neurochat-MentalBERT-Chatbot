import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";

import { Download } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>System Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Generate and download performance, bias, and compliance reports 
            for administrative review and documentation.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="flex items-center gap-2 w-fit">
              <Download size={16} /> Download System Performance Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2 w-fit">
              <Download size={16} /> Download Bias Audit Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2 w-fit">
              <Download size={16} /> Download Compliance Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
