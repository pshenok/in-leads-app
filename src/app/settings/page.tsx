"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { ProfileSection } from "@/components/settings/profile-section";
import { ServicesSection } from "@/components/settings/services-section";
import { PlatformsSection } from "@/components/settings/platforms-section";
import { AiScriptSection } from "@/components/settings/ai-script-section";
import { AlertsSection } from "@/components/settings/alerts-section";
import { PlanSection } from "@/components/settings/plan-section";

const tabs = [
  { value: "profile", label: "Profile", component: ProfileSection },
  { value: "services", label: "Services & Pricing", component: ServicesSection },
  { value: "platforms", label: "Platforms", component: PlatformsSection },
  { value: "ai-script", label: "AI Script", component: AiScriptSection },
  { value: "alerts", label: "Alerts", component: AlertsSection },
  { value: "plan", label: "Plan & Billing", component: PlanSection },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-foreground">
          SETTINGS
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account, integrations, and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg border border-transparent px-4 py-2 text-muted-foreground data-[active]:border-border data-[active]:bg-card data-[active]:text-primary data-[active]:shadow-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
