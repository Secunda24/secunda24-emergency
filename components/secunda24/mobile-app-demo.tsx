"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Crosshair,
  History,
  Phone,
  Search,
  ShieldAlert,
  Siren,
  Smartphone,
  TriangleAlert
} from "lucide-react";
import { toast } from "sonner";

import {
  AccountabilityStrip,
  AlertPill,
  DetailDataPoint,
  MapPlaceholder,
  PhoneFrame,
  SecundaEyebrow,
  StatusBadge,
  SuccessNotice
} from "@/components/secunda24/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recentAppAlerts, type AlertTone, type IncidentStatus } from "@/lib/secunda24-data";
import { cn, formatDate } from "@/lib/utils";

type DemoStep =
  | "welcome"
  | "verify"
  | "home"
  | "location"
  | "summary"
  | "submitted"
  | "history";

interface RecentAlertItem {
  id: string;
  tone: AlertTone;
  alertType: string;
  location: string;
  submittedAt: string;
  status: IncidentStatus;
  summary: string;
}

const steps: { id: DemoStep; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "verify", label: "Verify" },
  { id: "home", label: "Alert" },
  { id: "location", label: "Location" },
  { id: "summary", label: "Summary" },
  { id: "submitted", label: "Sent" },
  { id: "history", label: "History" }
];

const alertOptions = [
  {
    tone: "red" as AlertTone,
    title: "Red Alert",
    subtitle: "Medical Emergency",
    icon: Activity
  },
  {
    tone: "blue" as AlertTone,
    title: "Blue Alert",
    subtitle: "Crime / Security Emergency",
    icon: ShieldAlert
  }
];

const defaultSummary =
  "Security gate forced open by two men wearing dark hoodies near the loading bay.";

export function MobileAppDemo() {
  const [step, setStep] = useState<DemoStep>("welcome");
  const [profile, setProfile] = useState({
    fullName: "Thandeka Mhlongo",
    mobile: "+27 82 991 3404"
  });
  const [otpSent, setOtpSent] = useState(false);
  const [alertTone, setAlertTone] = useState<AlertTone>("red");
  const [selectedAddress, setSelectedAddress] = useState(
    "Trichardt Road shopping centre service gate"
  );
  const [summary, setSummary] = useState(defaultSummary);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlertItem[]>(recentAppAlerts);
  const [submittedAlert, setSubmittedAlert] = useState<RecentAlertItem | null>(null);

  const activeAlert = alertOptions.find((option) => option.tone === alertTone) ?? alertOptions[0];

  function handleSendOtp() {
    setOtpSent(true);
    toast.success("OTP sent for demo", {
      description:
        "The prototype simulates number verification to show accountability and abuse prevention."
    });
  }

  function handleVerifyOtp() {
    setStep("home");
    toast.success("Number verified", {
      description: "This resident profile is now ready to submit structured alerts."
    });
  }

  function handleSubmitAlert() {
    const createdAt = new Date().toISOString();
    const nextAlert: RecentAlertItem = {
      id: `A-${Math.floor(1000 + Math.random() * 8999)}`,
      tone: alertTone,
      alertType: activeAlert.subtitle,
      location: selectedAddress,
      submittedAt: createdAt,
      status: "New",
      summary
    };

    setSubmittedAlert(nextAlert);
    setRecentAlerts((current) => [nextAlert, ...current]);
    setStep("submitted");

    toast.success("Alert routed to response network", {
      description:
        "The demo shows verified identity, timestamp, location, and device metadata logging."
    });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(239,68,68,0.12),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef2ff_100%)]">
      <div className="container py-10 sm:py-14">
        <div className="grid gap-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
          <div className="space-y-6 xl:sticky xl:top-10">
            <SecundaEyebrow>Mobile app prototype</SecundaEyebrow>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Verified reporting in a calm, panic-friendly mobile flow.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                This demo shows how a resident verifies identity, chooses a Red or Blue Alert, pins
                the location, submits a short summary, and sees the alert routed to the response
                network.
              </p>
            </div>

            <Card className="border-white/80 bg-white/85">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-950 p-3 text-white">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">Prototype story</p>
                    <p className="text-sm text-slate-600">
                      The UI prioritizes speed, trust, and accountability.
                    </p>
                  </div>
                </div>
                <AccountabilityStrip />
                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    Reports are linked to verified users to reduce false emergencies and improve
                    responder trust.
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    Immediate danger? The home screen still prioritizes a visible emergency call
                    shortcut.
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              {steps.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setStep(entry.id)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
                    step === entry.id
                      ? "border-sky-300 bg-white text-slate-950 shadow-sm"
                      : "border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300"
                  )}
                >
                  <span className="font-medium">{entry.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <PhoneFrame className="max-w-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-[680px]"
                >
                  {step === "welcome" && (
                    <div className="flex h-full flex-col justify-between gap-8 pt-4">
                      <div className="space-y-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.7rem] bg-slate-950 text-white shadow-lg">
                          <Siren className="h-8 w-8" />
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                            Secunda24 Emergency
                          </p>
                          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                            Fast verified emergency reporting for Secunda.
                          </h2>
                          <p className="text-sm leading-6 text-slate-600">
                            Designed for quick location-aware emergency reporting without turning
                            into a chat feed.
                          </p>
                        </div>
                        <div className="grid gap-3">
                          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
                            <AlertPill tone="red" label="Red Alert" />
                            <p className="mt-3 text-sm font-medium text-rose-900">
                              Medical Emergency
                            </p>
                          </div>
                          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4">
                            <AlertPill tone="blue" label="Blue Alert" />
                            <p className="mt-3 text-sm font-medium text-sky-900">
                              Crime / Security Emergency
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Button size="lg" className="w-full bg-slate-950 hover:bg-slate-900" onClick={() => setStep("verify")}>
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full" onClick={() => toast("Secunda24 demo", { description: "The landing page explains the partner routing model in more detail." })}>
                          Learn more
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === "verify" && (
                    <div className="space-y-6 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep("welcome")}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Login / verification
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          Verify before you report
                        </h2>
                        <p className="text-sm leading-6 text-slate-600">
                          Reports are linked to verified users to reduce false emergencies.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <Input
                          value={profile.mobile}
                          onChange={(event) =>
                            setProfile((current) => ({
                              ...current,
                              mobile: event.target.value
                            }))
                          }
                          placeholder="Mobile number"
                        />
                        <Input
                          value={profile.fullName}
                          onChange={(event) =>
                            setProfile((current) => ({
                              ...current,
                              fullName: event.target.value
                            }))
                          }
                          placeholder="Full name"
                        />
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 text-sm leading-6 text-slate-600">
                        Reports are linked to verified users to reduce false emergencies and improve
                        responder trust.
                      </div>
                      {!otpSent ? (
                        <Button size="lg" className="w-full bg-slate-950 hover:bg-slate-900" onClick={handleSendOtp}>
                          Send OTP
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                            Demo OTP sent. This prototype simulates number verification without a
                            real backend.
                          </div>
                          <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500" onClick={handleVerifyOtp}>
                            Verify OTP
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {step === "home" && (
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Home / alert type
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          Choose the right emergency channel
                        </h2>
                      </div>
                      <div className="grid gap-4">
                        {alertOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.tone}
                              type="button"
                              onClick={() => {
                                setAlertTone(option.tone);
                                setStep("location");
                              }}
                              className={cn(
                                "rounded-[2rem] border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
                                option.tone === "red"
                                  ? "border-rose-200 bg-rose-50"
                                  : "border-sky-200 bg-sky-50"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                                  <Icon
                                    className={cn(
                                      "h-6 w-6",
                                      option.tone === "red" ? "text-rose-600" : "text-sky-600"
                                    )}
                                  />
                                </div>
                                <ChevronRight className="h-5 w-5 text-slate-400" />
                              </div>
                              <p className="mt-6 text-lg font-semibold text-slate-950">
                                {option.title}
                              </p>
                              <p className="mt-1 text-sm text-slate-600">{option.subtitle}</p>
                            </button>
                          );
                        })}
                      </div>
                      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        Immediate danger? Call emergency services now.
                      </div>
                      <Button size="lg" variant="outline" className="w-full bg-white" onClick={() => toast("Emergency call shortcut", { description: "This button is a placeholder for direct dial integration." })}>
                        <Phone className="mr-2 h-4 w-4" />
                        Emergency call shortcut
                      </Button>
                    </div>
                  )}

                  {step === "location" && (
                    <div className="space-y-5 pt-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Location picker
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          Pin the exact location
                        </h2>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          value={selectedAddress}
                          onChange={(event) => setSelectedAddress(event.target.value)}
                          className="pl-10"
                          placeholder="Search street, landmark, or drop pin"
                        />
                      </div>
                      <MapPlaceholder
                        tone={alertTone}
                        title="Selected location"
                        description="Use a nearby road or landmark so dispatchers can route the right partner quickly."
                      />
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full bg-white"
                        onClick={() => {
                          setSelectedAddress("Current location pinned near Medi Clinic access road");
                          toast.success("Current location selected");
                        }}
                      >
                        <Crosshair className="mr-2 h-4 w-4" />
                        Use my current location
                      </Button>
                      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Selected address
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-800">
                          {selectedAddress}
                        </p>
                      </div>
                      <Button size="lg" className="w-full bg-slate-950 hover:bg-slate-900" onClick={() => setStep("summary")}>
                        Confirm Location
                      </Button>
                    </div>
                  )}

                  {step === "summary" && (
                    <div className="space-y-5 pt-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Summary
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          Add a very short description
                        </h2>
                      </div>
                      <div className="grid gap-3">
                        <DetailDataPoint label="Selected alert type" value={activeAlert.subtitle} />
                        <DetailDataPoint label="Selected location" value={selectedAddress} />
                      </div>
                      <div className="space-y-3">
                        <Textarea
                          maxLength={140}
                          value={summary}
                          onChange={(event) => setSummary(event.target.value)}
                          placeholder="Very short description of what is happening"
                          className="min-h-[150px]"
                        />
                        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Keep it brief and specific.</span>
                          <span>{summary.length}/140</span>
                        </div>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600">
                        For safety and emergency purposes, reports are logged with user, time, and
                        location data.
                      </div>
                      <Button size="lg" className="w-full bg-slate-950 hover:bg-slate-900" onClick={handleSubmitAlert}>
                        Submit Alert
                      </Button>
                    </div>
                  )}

                  {step === "submitted" && submittedAlert && (
                    <div className="space-y-5 pt-4">
                      <SuccessNotice
                        title="Alert submitted successfully"
                        description="Your alert has been sent to the response network for dispatch review."
                      />
                      <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <AlertPill tone={submittedAlert.tone} />
                          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Sent to response network
                          </div>
                        </div>
                        <div className="grid gap-3">
                          <DetailDataPoint label="Alert type" value={submittedAlert.alertType} />
                          <DetailDataPoint
                            label="Submitted timestamp"
                            value={formatDate(submittedAlert.submittedAt, "MMM d, yyyy h:mm a")}
                          />
                          <DetailDataPoint label="Location" value={submittedAlert.location} />
                          <DetailDataPoint label="Short summary" value={submittedAlert.summary} />
                        </div>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600">
                        Your alert is logged for emergency and security purposes.
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Button size="lg" className="bg-slate-950 hover:bg-slate-900" onClick={() => setStep("home")}>
                          Back Home
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white" onClick={() => toast("Call now", { description: "This is a demo placeholder for voice escalation." })}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === "history" && (
                    <div className="space-y-5 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                            My recent alerts
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                            Recent activity
                          </h2>
                        </div>
                        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                          <History className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {recentAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="rounded-[1.8rem] border border-slate-200 bg-white/85 p-4 shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <AlertPill tone={alert.tone} />
                              <StatusBadge status={alert.status} />
                            </div>
                            <div className="mt-4 space-y-2">
                              <p className="font-semibold text-slate-900">{alert.location}</p>
                              <p className="text-sm leading-6 text-slate-600">{alert.summary}</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                              <Clock3 className="h-3.5 w-3.5" />
                              {formatDate(alert.submittedAt, "MMM d, h:mm a")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                      <TriangleAlert className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">What responders receive</p>
                      <p className="text-sm text-slate-600">
                        A verified alert type, pin, timestamp, short summary, and user details.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <DetailDataPoint label="Verified resident" value={profile.fullName} />
                    <DetailDataPoint label="Mobile number" value={profile.mobile} />
                    <DetailDataPoint
                      label="Metadata placeholder"
                      value="Device fingerprint, IP hint, and event timestamps"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-rose-100 p-3 text-rose-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">Demo outcomes</p>
                      <p className="text-sm text-slate-600">
                        The prototype keeps the flow simple enough for stressful real-world use.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>Residents never enter a chat room or social feed.</li>
                    <li>The alert flow stays under a few focused actions.</li>
                    <li>Recent alerts demonstrate accountability and logged history.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
