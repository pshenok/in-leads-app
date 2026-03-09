"use client";

import { Button } from "@/components/ui/button";

interface Platform {
  name: string;
  status: "connected" | "pending";
  description: string;
  action: string;
}

const platforms: Platform[] = [
  {
    name: "Thumbtack",
    status: "connected",
    description: "Connected since Feb 2026",
    action: "Disconnect",
  },
  {
    name: "Angi",
    status: "connected",
    description: "Connected since Jan 2026",
    action: "Disconnect",
  },
  {
    name: "Yelp",
    status: "pending",
    description: "Waiting for email verification",
    action: "Reconnect",
  },
];

export function PlatformsSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <h2 className="text-lg font-semibold text-foreground">Connected Platforms</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your lead source integrations
        </p>
      </div>

      {platforms.map((platform) => (
        <div
          key={platform.name}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
              {platform.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{platform.name}</span>
                {platform.status === "connected" ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-orange-600">
                    <span className="inline-block h-2 w-2 rounded-full bg-orange-600" />
                    Pending
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {platform.description}
              </p>
            </div>
          </div>

          <Button
            variant={platform.status === "connected" ? "outline" : "default"}
            onClick={() =>
              alert(`${platform.action} ${platform.name}`)
            }
          >
            {platform.action}
          </Button>
        </div>
      ))}
    </div>
  );
}
