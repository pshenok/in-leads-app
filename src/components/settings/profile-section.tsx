"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProfileSection() {
  const [name, setName] = useState("Mike Thompson");
  const [company, setCompany] = useState(
    "Mike's Plumbing & Home Services"
  );
  const [phone, setPhone] = useState("(602) 555-0147");
  const [email, setEmail] = useState("mike@mikesplumbing.com");

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Profile Information</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your personal and business details
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-muted-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm text-muted-foreground">
            Company
          </Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm text-muted-foreground">
            Phone
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => alert("Changes saved!")}>Save Changes</Button>
      </div>
    </div>
  );
}
