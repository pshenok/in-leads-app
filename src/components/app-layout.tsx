import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";

export function AppLayout({ children }: { children: React.ReactNode }) {
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
