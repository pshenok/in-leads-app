"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden h-16 border-b border-gray-200 bg-white lg:block">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
            INLEADS
          </span>
        </Link>

        {/* Center: Nav items */}
        <nav className="flex items-center gap-1">
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
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "font-semibold text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Bell + Avatar */}
        <div className="flex items-center gap-4">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            M
          </div>
        </div>
      </div>
    </header>
  );
}
