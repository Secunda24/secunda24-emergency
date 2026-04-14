import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  SquareStack,
  Target,
  Waypoints
} from "lucide-react";

import {
  AccountabilityStrip,
  AlertPill,
  MapPlaceholder,
  PhoneFrame,
  SecundaEyebrow,
  SectionShell
} from "@/components/secunda24/shared";
import { WaitlistForm } from "@/components/secunda24/waitlist-form";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  demoFlowCards,
  howItWorksSteps,
  partnerHighlights,
  whyDifferentPoints
} from "@/lib/secunda24-data";

const differentiators = [
  {
    icon: SquareStack,
    title: "Structured alerts",
    description: "The resident sends one clear incident packet instead of a noisy chain of messages."
  },
  {
    icon: ShieldCheck,
    title: "Verified users",
    description: "Name, number, and metadata placeholders show how the system discourages abuse."
  },
  {
    icon: Waypoints,
    title: "Map-based location",
    description: "Exact pins help dispatchers route the right partner without guesswork."
  }
];

const partnerCards = [
  {
    icon: Target,
    title: "Structured alert intake",
    body: "Partners see exact location, alert type, summary, and reporter details in one view."
  },
  {
    icon: Clock3,
    title: "Faster routing logic",
    body: "Dispatchers can move incidents from new to responding while maintaining a visible audit trail."
  },
  {
    icon: Smartphone,
    title: "Pitch-ready workflow",
    body: "The prototype makes it easy for a local company to imagine the service in daily operations."
  }
];

function HeroPhone() {
  return (
    <PhoneFrame className="max-w-[360px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Secunda24 Emergency
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Report in seconds
            </p>
          </div>
          <div className="rounded-2xl bg-slate-950 p-3 text-white shadow-lg">
            <PhoneCall className="h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-5 shadow-sm">
            <AlertPill tone="red" label="Red Alert" />
            <p className="mt-4 text-lg font-semibold text-rose-950">Medical Emergency</p>
            <p className="mt-2 text-sm leading-6 text-rose-800">
              Send a verified medical alert with exact location and a short summary.
            </p>
          </div>
          <div className="rounded-[2rem] border border-sky-200 bg-sky-50 p-5 shadow-sm">
            <AlertPill tone="blue" label="Blue Alert" />
            <p className="mt-4 text-lg font-semibold text-sky-950">
              Crime / Security Emergency
            </p>
            <p className="mt-2 text-sm leading-6 text-sky-800">
              Route incidents to trusted local security partners through a clean workflow.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Accountability captured
          </p>
          <div className="mt-3">
            <AccountabilityStrip />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function SecundaLandingPage() {
  return (
    <div className="pb-10">
      <section className="container grid gap-14 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
        <FadeIn className="space-y-8">
          <div className="space-y-5">
            <SecundaEyebrow>Built for local response</SecundaEyebrow>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Emergency reporting for Secunda, in seconds.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Send a verified medical or crime alert with exact location, so trusted local
              responders can act faster.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-slate-950 shadow-slate-900/20 hover:bg-slate-900">
              <Link href="/demo/app">
                View App Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/80">
              <Link href="#waitlist">Become a Launch Partner</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-sm">
              <HeartPulse className="h-5 w-5 text-rose-600" />
              <p className="mt-3 font-semibold text-slate-950">Medical flow</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                One clear Red Alert path keeps medical reporting fast and structured.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-sky-600" />
              <p className="mt-3 font-semibold text-slate-950">Security routing</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Blue Alerts move into partner dispatch instead of a public group chat.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p className="mt-3 font-semibold text-slate-950">Logged accountability</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Every report is tied to identity, time, and location data to reduce abuse.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative">
            <div className="absolute -left-8 top-8 hidden h-44 w-44 rounded-full bg-sky-200/50 blur-3xl lg:block" />
            <div className="absolute -right-8 bottom-8 hidden h-44 w-44 rounded-full bg-rose-200/50 blur-3xl lg:block" />
            <HeroPhone />
          </div>
        </FadeIn>
      </section>

      <div id="how-it-works">
        <SectionShell
          title="A panic-friendly flow from verification to dispatch."
          description="The prototype is intentionally simple so residents can act quickly while partners receive structured, accountable information."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {howItWorksSteps.map((item, index) => (
              <FadeIn key={item.step} delay={index * 0.05}>
                <Card className="h-full border-white/80 bg-white/90">
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </SectionShell>
      </div>

      <div id="why-different">
        <SectionShell
          title="Why it's different from a neighborhood chat group."
          description="Secunda24 Emergency is built as a verified reporting channel, not a discussion feed. That keeps the workflow calmer, more accountable, and easier for partners to act on."
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {differentiators.map((item, index) => {
                const Icon = item.icon;

                return (
                  <FadeIn key={item.title} delay={index * 0.06}>
                    <Card className="border-white/80 bg-white/90">
                      <CardContent className="flex gap-4 p-6">
                        <div className="rounded-2xl bg-slate-950 p-3 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-950">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>

            <Card className="overflow-hidden border-white/80 bg-white/90">
              <CardContent className="space-y-5 p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Core difference
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    A structured incident packet reaches the right responders faster.
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {whyDifferentPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm font-medium text-slate-700"
                    >
                      {point}
                    </div>
                  ))}
                </div>
                <MapPlaceholder
                  tone="blue"
                  title="Mapped incidents, not message chaos"
                  description="A clear pin and structured fields create a more usable dispatch signal than an open-ended group chat."
                />
              </CardContent>
            </Card>
          </div>
        </SectionShell>
      </div>

      <div id="partners">
        <SectionShell
          title="Built for trusted local response partners."
          description="Security and medical partners receive structured alerts with exact location, short summaries, and verified user details through a simple dashboard workflow."
        >
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 md:grid-cols-3">
              {partnerCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <FadeIn key={item.title} delay={index * 0.06}>
                    <Card className="h-full border-white/80 bg-white/90">
                      <CardContent className="space-y-4 p-6">
                        <div className="rounded-2xl bg-slate-950 p-3 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-950">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                );
              })}
            </div>

            <Card className="border-white/80 bg-slate-950 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
              <CardContent className="space-y-5 p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Partner value
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    Local response companies see a credible operational workflow from day one.
                  </h3>
                </div>
                <div className="grid gap-3">
                  {partnerHighlights.map((point) => (
                    <div
                      key={point}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
                    >
                      {point}
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild className="w-full bg-white text-slate-950 hover:bg-slate-100">
                  <Link href="/demo/dashboard">Open Dispatcher Demo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </SectionShell>
      </div>

      <SectionShell
        title="Demo screens built for live walkthroughs."
        description="Use these screens to walk a partner through the resident flow, the accountability layer, and the dispatcher experience."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {demoFlowCards.map((screen, index) => (
            <FadeIn key={screen.title} delay={index * 0.04}>
              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {screen.title === "Dispatcher Dashboard" ? (
                      <AlertPill tone="blue" label="Partner console" />
                    ) : (
                      <AlertPill tone={index % 2 === 0 ? "red" : "blue"} />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-950">{screen.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {screen.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <section className="container grid gap-6 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Card className="border-white/80 bg-white/90">
          <CardContent className="space-y-5 p-6">
            <SecundaEyebrow>Demo system design</SecundaEyebrow>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950">
              A public landing page, app demo, and dispatcher console in one prototype.
            </h2>
            <p className="text-base leading-7 text-slate-600">
              The prototype is front-end only, but it clearly shows the product story: verified
              reporting, exact location capture, short summaries, and partner routing with audit
              history.
            </p>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <p className="font-semibold text-slate-950">Landing page</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Trust-focused messaging for residents, security companies, and medical partners.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <p className="font-semibold text-slate-950">Mobile app prototype</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Realistic phone flow with verification, alert choice, pinning, summary, and
                  confirmation.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <p className="font-semibold text-slate-950">Dispatcher dashboard</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Incident management, partner assignment, coverage zones, and audit logging for
                  demos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <MapPlaceholder
          tone="red"
          title="Mock location intelligence"
          description="A stylized map placeholder keeps the prototype lightweight while still showing how precise location is central to the product."
        />
      </section>

      <section id="waitlist" className="container py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="border-white/80 bg-slate-950 text-white">
            <CardContent className="space-y-5 p-6">
              <SecundaEyebrow className="border-white/10 bg-white/10 text-white">
                Join the launch network
              </SecundaEyebrow>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Join the launch network.
              </h2>
              <p className="text-base leading-7 text-slate-300">
                Residents, local security providers, and medical responders can register interest in
                the pilot network through this demo waitlist.
              </p>
              <div className="grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  Built for local response
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  Verified users and logged reports to reduce fake emergencies
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  Routing to trusted partners instead of public community threads
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/80 bg-white/90">
            <CardContent className="p-6">
              <WaitlistForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
