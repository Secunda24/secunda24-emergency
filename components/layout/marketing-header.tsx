import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/shared/site-logo";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <SiteLogo name="Secunda24 Emergency" mark="S24" />
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            How it works
          </Link>
          <Link href="#why-different" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Why it's different
          </Link>
          <Link href="#partners" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Partners
          </Link>
          <Link href="#waitlist" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Waitlist
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/demo/dashboard">Dispatcher Demo</Link>
          </Button>
          <Button asChild className="bg-slate-950 shadow-slate-900/20 hover:bg-slate-900">
            <Link href="/demo/app">
              View App Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
