"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface AlertToggle {
  id: string;
  label: string;
  defaultChecked: boolean;
}

const alertToggles: AlertToggle[] = [
  { id: "hot", label: "Alert on HOT leads", defaultChecked: true },
  { id: "warm", label: "Alert on WARM leads", defaultChecked: true },
  { id: "cold", label: "Alert on COLD leads", defaultChecked: false },
  { id: "email", label: "Email notifications", defaultChecked: true },
  { id: "daily", label: "Daily summary report", defaultChecked: false },
];

export function AlertsSection() {
  const [phone, setPhone] = useState("(602) 555-0147");
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(alertToggles.map((t) => [t.id, t.defaultChecked]))
  );

  const handleToggle = (id: string, checked: boolean) => {
    setToggles((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Notification Preferences</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how and when you get alerted about new leads
      </p>

      <div className="mt-6 space-y-6">
        <div className="max-w-sm space-y-2">
          <Label htmlFor="sms-phone" className="text-sm text-muted-foreground">
            SMS Alerts Phone
          </Label>
          <Input
            id="sms-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm text-muted-foreground">
            Notification Triggers
          </Label>
          {alertToggles.map((toggle) => (
            <div
              key={toggle.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 px-4 py-3"
            >
              <span className="text-sm font-medium">{toggle.label}</span>
              <Switch
                checked={toggles[toggle.id]}
                onCheckedChange={(checked: boolean) =>
                  handleToggle(toggle.id, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => alert("Preferences saved!")}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
