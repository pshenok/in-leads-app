"use client";

import { Link2 } from "lucide-react";

export function PlatformsSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">Connected Platforms</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your lead source integrations
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Link2 className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-gray-900">No platforms connected</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the API key from the Integrations tab to receive leads from any source.
          <br />
          Direct platform integrations (Thumbtack, Angi, Yelp) coming soon.
        </p>
      </div>
    </div>
  );
}
