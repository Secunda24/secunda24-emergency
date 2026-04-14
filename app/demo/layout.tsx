import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteLogo } from "@/components/shared/site-logo";
import { Button } from "@/components/ui/button";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-6">
          <SiteLogo name="Secunda24 Emergency" mark="S24" />
          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              Landing
            </Link>
            <Link
              href="/demo/app"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              App Demo
            </Link>
            <Link
              href="/demo/dashboard"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Dashboard
            </Link>
          </nav>
          <Button asChild className="bg-slate-950 shadow-slate-900/20 hover:bg-slate-900">
            <Link href="/">
              Back to Landing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}
