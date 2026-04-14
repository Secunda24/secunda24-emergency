import Link from "next/link";

import { SiteLogo } from "@/components/shared/site-logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/60 py-10">
      <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <SiteLogo name="Secunda24 Emergency" mark="S24" />
          <p className="max-w-md text-sm text-muted-foreground">
            Built for local response. This working prototype demonstrates verified emergency
            reporting, partner routing, and audit logging for Secunda.
          </p>
          <div className="text-sm text-muted-foreground">
            <p>hello@secunda24emergency.demo</p>
            <p>+27 00 000 0000</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link href="/demo/app" className="transition hover:text-foreground">
            App demo
          </Link>
          <Link href="/demo/dashboard" className="transition hover:text-foreground">
            Dashboard demo
          </Link>
          <Link href="#" className="transition hover:text-foreground">
            Facebook placeholder
          </Link>
          <Link href="#" className="transition hover:text-foreground">
            LinkedIn placeholder
          </Link>
        </div>
      </div>
    </footer>
  );
}
