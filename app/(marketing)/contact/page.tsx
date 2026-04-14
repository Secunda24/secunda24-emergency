import Link from "next/link";
import { CalendarDays, Mail, PhoneCall } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactWays = [
  {
    title: "Schedule a strategy call",
    detail: "Walk through the demo, talk about your industry, and map the portal to your delivery workflow.",
    icon: CalendarDays
  },
  {
    title: "Email the team",
    detail: "sales@secunda24.co.za",
    icon: Mail
  },
  {
    title: "Call for a guided demo",
    detail: "082 529 2885",
    icon: PhoneCall
  }
];

export default function ContactPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="eyebrow">Contact</span>
        <h1 className="font-display text-5xl font-semibold tracking-tight">Let’s tailor the portal to your business</h1>
        <p className="text-lg text-muted-foreground">
          This demo is designed to be adapted across industries. Reach out if you want a custom build, white-label deployment, or industry-specific workflows.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {contactWays.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Button size="lg" asChild>
          <Link href="/signup">Create a demo account</Link>
        </Button>
      </div>
    </div>
  );
}
