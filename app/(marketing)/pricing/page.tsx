import Link from "next/link";

import { pricingTiers } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="eyebrow">Demo pricing</span>
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Flexible packaging for service businesses
        </h1>
        <p className="text-lg text-muted-foreground">
          Position the portal as a branded monthly service, a project accelerator, or an enterprise custom system.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <Card key={tier.name} className={index === 1 ? "border-brand shadow-card" : undefined}>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {index === 1 ? <span className="eyebrow">Most popular</span> : null}
              </div>
              <p className="font-display text-4xl font-semibold">{tier.price}</p>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="rounded-2xl border border-border/70 bg-background/60 px-4 py-3">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" asChild>
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

