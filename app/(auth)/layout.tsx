import type { ReactNode } from "react";

export default function AuthLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="container grid min-h-screen items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <span className="eyebrow">ClientFlow Portal</span>
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Premium client experience, from first login onward
        </h1>
        <p className="max-w-xl text-lg leading-8 text-muted-foreground">
          A polished white-label portal for requests, projects, invoices, documents, messaging, and knowledge base content.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
            <p className="font-semibold">Responsive by design</p>
            <p className="mt-2 text-sm text-muted-foreground">Desktop, tablet, and mobile layouts are all part of the demo experience.</p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
            <p className="font-semibold">Supabase ready</p>
            <p className="mt-2 text-sm text-muted-foreground">Auth, database, storage, RLS policies, and demo seeds are included.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">{children}</div>
    </div>
  );
}
