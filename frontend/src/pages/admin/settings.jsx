import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Switch } from "../../components/switch";

const Settings = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable System Logging</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Auto Backup Data</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Allow Model Updates</span>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
