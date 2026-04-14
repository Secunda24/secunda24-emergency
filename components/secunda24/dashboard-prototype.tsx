"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  ChevronRight,
  CircleDashed,
  Flag,
  MapPinned,
  Search,
  ShieldCheck,
  Siren,
  UserRound
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertPill,
  DetailDataPoint,
  MapPlaceholder,
  MetricCard,
  PartnerStatusBadge,
  SecundaEyebrow,
  StatusBadge
} from "@/components/secunda24/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { coverageZones, incidents, partners, type IncidentRecord, type IncidentStatus } from "@/lib/secunda24-data";
import { formatDate } from "@/lib/utils";

const nextStatusActions: IncidentStatus[] = [
  "Reviewing",
  "Forwarded",
  "Responding",
  "Closed",
  "False Alarm Flagged"
];

export function DashboardPrototype() {
  const [incidentState, setIncidentState] = useState(incidents);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(incidents[0]?.id ?? "");
  const deferredQuery = useDeferredValue(query);

  const filteredIncidents = incidentState.filter((incident) => {
    const haystack = [
      incident.id,
      incident.summary,
      incident.location,
      incident.reporterName,
      incident.partnerAssigned
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredQuery.toLowerCase());
  });

  const selectedIncident =
    filteredIncidents.find((incident) => incident.id === selectedId) ??
    incidentState.find((incident) => incident.id === selectedId) ??
    filteredIncidents[0] ??
    incidentState[0];

  const totalAlertsToday = incidentState.filter((incident) =>
    incident.receivedAt.startsWith("2026-04-14")
  ).length;
  const activeIncidents = incidentState.filter(
    (incident) => !["Closed", "False Alarm Flagged"].includes(incident.status)
  ).length;
  const blueAlertsToday = incidentState.filter(
    (incident) => incident.tone === "blue" && incident.receivedAt.startsWith("2026-04-14")
  ).length;
  const redAlertsToday = incidentState.filter(
    (incident) => incident.tone === "red" && incident.receivedAt.startsWith("2026-04-14")
  ).length;
  const flaggedAccounts = incidentState.filter(
    (incident) => incident.status === "False Alarm Flagged"
  ).length;

  function updateIncident(
    incidentId: string,
    updater: (incident: IncidentRecord) => IncidentRecord
  ) {
    setIncidentState((current) =>
      current.map((incident) => (incident.id === incidentId ? updater(incident) : incident))
    );
  }

  function handleStatusUpdate(status: IncidentStatus) {
    if (!selectedIncident) {
      return;
    }

    updateIncident(selectedIncident.id, (incident) => ({
      ...incident,
      status,
      auditLog: [
        {
          id: `${incident.id}-${incident.auditLog.length + 1}`,
          at: new Date().toISOString(),
          actor: "Secunda24 Dispatch",
          action: "Status changed",
          detail: `Incident updated to ${status}.`
        },
        ...incident.auditLog
      ]
    }));

    toast.success(`Incident marked ${status}`);
  }

  function handleAssignPartner(partnerName: string) {
    if (!selectedIncident) {
      return;
    }

    updateIncident(selectedIncident.id, (incident) => ({
      ...incident,
      partnerAssigned: partnerName,
      auditLog: [
        {
          id: `${incident.id}-${incident.auditLog.length + 1}`,
          at: new Date().toISOString(),
          actor: "Secunda24 Dispatch",
          action: "Partner assigned",
          detail: `Assigned to ${partnerName}.`
        },
        ...incident.auditLog
      ]
    }));

    toast.success(`Assigned to ${partnerName}`);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent_20%),linear-gradient(180deg,#f8fbff_0%,#eff3ff_100%)]">
      <div className="container py-8 sm:py-10">
        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3">
              <SecundaEyebrow>Dispatcher / partner dashboard</SecundaEyebrow>
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Built for trusted local response partners.
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                  Security and medical partners receive structured alerts with exact location, short
                  summaries, and verified user details through a simple dashboard workflow.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-[260px]">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <Input
                  value={query}
                  onChange={(event) => startTransition(() => setQuery(event.target.value))}
                  className="pl-10"
                  placeholder="Search incidents, reporter, area..."
                />
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
              >
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <div className="rounded-2xl bg-slate-950 p-2 text-white">
                  <UserRound className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Secunda24 Admin</p>
                  <p className="text-xs text-slate-500">Monitoring + partner routing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            label="Total alerts today"
            value={String(totalAlertsToday)}
            note="Structured alerts logged across Secunda hotspots."
            tone="blue"
          />
          <MetricCard
            label="Active incidents"
            value={String(activeIncidents)}
            note="Incidents still being reviewed, forwarded, or actively handled."
            tone="blue"
          />
          <MetricCard
            label="Blue alerts today"
            value={String(blueAlertsToday)}
            note="Crime and security events submitted by verified residents."
            tone="blue"
          />
          <MetricCard
            label="Red alerts today"
            value={String(redAlertsToday)}
            note="Medical incidents routed into the response network."
            tone="red"
          />
          <MetricCard
            label="Flagged accounts"
            value={String(flaggedAccounts)}
            note="Audit logging helps identify false alarm or abuse patterns."
            tone="red"
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Card className="border-white/80 bg-white/90">
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">Incident feed</p>
                    <p className="text-sm text-slate-500">
                      Click an incident to inspect details and routing history.
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {filteredIncidents.length} visible
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  {filteredIncidents.map((incident) => (
                    <motion.button
                      key={incident.id}
                      type="button"
                      layout
                      onClick={() => setSelectedId(incident.id)}
                      className={`w-full rounded-[1.8rem] border p-5 text-left transition ${
                        selectedIncident?.id === incident.id
                          ? "border-sky-300 bg-sky-50/70 shadow-md"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <AlertPill tone={incident.tone} />
                            <StatusBadge status={incident.status} />
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              {incident.id}
                            </span>
                          </div>
                          <p className="text-base font-semibold text-slate-950">
                            {incident.summary}
                          </p>
                          <div className="grid gap-1 text-sm text-slate-600">
                            <p>{incident.address}</p>
                            <p>
                              Reporter: {incident.reporterName} | {incident.reporterMobile}
                            </p>
                            <p>
                              Partner assigned: {incident.partnerAssigned} | Received{" "}
                              {formatDate(incident.receivedAt, "MMM d, h:mm a")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-start rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                          Open details
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">Partner routing panel</p>
                      <p className="text-sm text-slate-600">
                        Sample partners ready for pilot routing workflows.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-950">{partner.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{partner.type}</p>
                          </div>
                          <PartnerStatusBadge status={partner.status} />
                        </div>
                        <div className="mt-4 grid gap-2 text-sm text-slate-600">
                          <p>Area coverage: {partner.areaCoverage}</p>
                          <p>Response method: {partner.responseMethod}</p>
                          <p>Typical ETA: {partner.eta}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4 bg-white"
                          onClick={() => handleAssignPartner(partner.name)}
                        >
                          Assign to Partner
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-rose-100 p-3 text-rose-700">
                      <MapPinned className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">Coverage map placeholder</p>
                      <p className="text-sm text-slate-600">
                        Simple visual coverage zones for the pilot partner network.
                      </p>
                    </div>
                  </div>
                  <MapPlaceholder
                    tone="blue"
                    title="Pilot coverage zones"
                    description="Zones are shown here as a visual planning aid for dispatching and partner onboarding."
                  />
                  <div className="space-y-3">
                    {coverageZones.map((zone) => (
                      <div
                        key={zone.name}
                        className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                      >
                        <p className="font-semibold text-slate-900">{zone.name}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{zone.detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {selectedIncident && (
            <div className="space-y-6 xl:sticky xl:top-8">
              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">
                        Incident detail panel
                      </p>
                      <p className="text-sm text-slate-500">
                        {selectedIncident.id} opened for review.
                      </p>
                    </div>
                    <StatusBadge status={selectedIncident.status} />
                  </div>

                  <MapPlaceholder
                    tone={selectedIncident.tone}
                    title={selectedIncident.address}
                    description="Mock location preview for the selected incident."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DetailDataPoint label="Alert type" value={selectedIncident.alertType} />
                    <DetailDataPoint
                      label="Timestamp"
                      value={formatDate(selectedIncident.receivedAt, "MMM d, yyyy h:mm a")}
                    />
                    <DetailDataPoint
                      label="Reporter identity"
                      value={selectedIncident.reporterName}
                    />
                    <DetailDataPoint
                      label="Mobile number"
                      value={selectedIncident.reporterMobile}
                    />
                    <DetailDataPoint label="Full location" value={selectedIncident.address} />
                    <DetailDataPoint
                      label="Device / IP placeholder"
                      value={`${selectedIncident.deviceMeta} | ${selectedIncident.ipMeta}`}
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {selectedIncident.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">Incident actions</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button
                        variant="outline"
                        className="bg-white"
                        onClick={() =>
                          toast("Partner assignment", {
                            description:
                              "Use the routing panel to assign a sample partner in this demo."
                          })
                        }
                      >
                        Assign to Partner
                      </Button>
                      {nextStatusActions.map((status) => (
                        <Button
                          key={status}
                          variant={status === "False Alarm Flagged" ? "destructive" : "outline"}
                          className={status === "False Alarm Flagged" ? "" : "bg-white"}
                          onClick={() => handleStatusUpdate(status)}
                        >
                          {status === "False Alarm Flagged" ? "Flag False Alarm" : `Mark ${status}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-white/90">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-950 p-3 text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">Audit / compliance log</p>
                      <p className="text-sm text-slate-600">
                        Shows how verified number, timestamps, location, and routing history are
                        captured.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DetailDataPoint
                      label="Verified number"
                      value={selectedIncident.reporterMobile}
                    />
                    <DetailDataPoint label="GPS location" value={selectedIncident.gps} />
                    <DetailDataPoint
                      label="Partner assignment history"
                      value={selectedIncident.partnerAssigned}
                    />
                    <DetailDataPoint label="Current status" value={selectedIncident.status} />
                  </div>

                  <div className="space-y-3">
                    {selectedIncident.auditLog.map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
                              <CircleDashed className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{entry.action}</p>
                              <p className="text-xs text-slate-500">
                                {entry.actor} | {formatDate(entry.at, "MMM d, h:mm a")}
                              </p>
                            </div>
                          </div>
                          {entry.action.includes("Partner") && (
                            <Flag className="h-4 w-4 text-sky-600" />
                          )}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{entry.detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/80 bg-slate-950 text-white">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3 text-white">
                      <Siren className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Pilot partner promise</p>
                      <p className="text-sm text-slate-300">
                        The dashboard shows a credible operational workflow without pretending to be
                        a full production dispatch platform yet.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-slate-300">
                    <li>No public chat or social feed is included.</li>
                    <li>Verified users and audit logs increase accountability.</li>
                    <li>Routing currently targets trusted local partners and Secunda24 admin.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
