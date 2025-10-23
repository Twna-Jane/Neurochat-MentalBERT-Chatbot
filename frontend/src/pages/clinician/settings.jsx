// src/pages/clinician/settings.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/card";
import { Button } from "../../components/button";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    alert("Settings saved!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Enable Notifications
          </label>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
