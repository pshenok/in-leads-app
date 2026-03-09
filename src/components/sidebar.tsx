"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Users, CalendarDays, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-border bg-[#0a0a0a] lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <Zap className="h-6 w-6 text-primary" />
        <span className="font-[family-name:var(--font-display)] text-2xl tracking-wider text-foreground">
          INLEADS
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User area */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              Mike&apos;s Plumbing
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-muted-foreground">
              GROWTH PLAN
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
