"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Users,
  Bot,
  CalendarDays,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Agents", href: "/agents", icon: Bot },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* Header bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
            INLEADS
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {open && (
        <>
          {/* Transparent overlay to close menu */}
          <div
            className="fixed inset-0 top-14 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown menu */}
          <nav className="fixed inset-x-0 top-14 z-50 border-b border-gray-200 bg-white p-2 lg:hidden">
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "font-semibold text-gray-900 bg-gray-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-1 border-t border-gray-100 pt-1">
              <button
                onClick={() => { setOpen(false); logout(); }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-colors hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5" />
                Log out{user?.name ? ` (${user.name.split(" ")[0]})` : ""}
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
