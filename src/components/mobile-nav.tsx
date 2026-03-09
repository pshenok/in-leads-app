"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Users, CalendarDays, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-[#0a0a0a] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
            INLEADS
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar overlay */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-border bg-[#0a0a0a] transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-[family-name:var(--font-display)] text-2xl tracking-wider text-foreground">
              INLEADS
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
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
                onClick={() => setOpen(false)}
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
    </>
  );
}
