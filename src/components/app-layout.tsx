"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";

const publicRoutes = ["/login", "/register"];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }
    if (!isLoading && isAuthenticated && isPublicRoute) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router]);

  // Public routes render without nav chrome
  if (isPublicRoute) return <>{children}</>;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Not authenticated (redirect in progress)
  if (!isAuthenticated) return null;

  // Fullscreen routes (wizard pages) — skip nav chrome
  const isFullscreenRoute =
    pathname.startsWith("/agents/new") ||
    (pathname.startsWith("/agents/") && pathname !== "/agents");

  if (isFullscreenRoute) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <MobileNav />
      <main className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        {children}
      </main>
    </div>
  );
}
