import type { ReactNode } from "react";
import { Activity, CheckCircle2, Crosshair, MapPinned, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type {
  AlertTone,
  IncidentStatus,
  PartnerRecord
} from "@/lib/secunda24-data";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  AlertTone,
  {
    badgeClass: string;
    borderClass: string;
    icon: typeof Activity;
    label: string;
  }
> = {
  red: {
    badgeClass: "bg-rose-600 text-white",
    borderClass: "border-rose-200/80",
    icon: Activity,
    label: "Red Alert"
  },
  blue: {
    badgeClass: "bg-sky-600 text-white",
    borderClass: "border-sky-200/80",
    icon: ShieldAlert,
    label: "Blue Alert"
  }
};

const statusVariantMap: Record<IncidentStatus, "neutral" | "info" | "warning" | "success" | "danger"> =
  {
    New: "info",
    Reviewing: "warning",
    Forwarded: "info",
    Responding: "success",
    Closed: "neutral",
    "False Alarm Flagged": "danger"
  };

const partnerStatusClasses: Record<PartnerRecord["status"], string> = {
  Online: "bg-emerald-100 text-emerald-700",
  Limited: "bg-amber-100 text-amber-700",
  Dispatching: "bg-sky-100 text-sky-700",
  Standby: "bg-slate-100 text-slate-700"
};

export function SecundaEyebrow({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-sky-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export function AlertPill({
  tone,
  label,
  className
}: {
  tone: AlertTone;
  label?: string;
  className?: string;
}) {
  const theme = toneStyles[tone];
  const Icon = theme.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
        theme.badgeClass,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label ?? theme.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return <Badge variant={statusVariantMap[status]}>{status}</Badge>;
}

export function PartnerStatusBadge({
  status
}: {
  status: PartnerRecord["status"];
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        partnerStatusClasses[status]
      )}
    >
      {status}
    </span>
  );
}

export function SectionShell({
  title,
  description,
  children,
  className
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container py-14 sm:py-20", className)}>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <SecundaEyebrow>Secunda24 Emergency</SecundaEyebrow>
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              {description}
            </p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

export function PhoneFrame({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[360px] rounded-[2.7rem] border border-slate-200 bg-slate-950 p-2.5 shadow-[0_28px_80px_rgba(15,23,42,0.24)]",
        className
      )}
    >
      <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-900" />
      <div className="rounded-[2.2rem] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] p-4 pt-10 shadow-inner">
        {children}
      </div>
    </div>
  );
}

export function MapPlaceholder({
  tone = "blue",
  title = "Secunda location pin",
  description = "Exact route guidance is captured before dispatch."
}: {
  tone?: AlertTone;
  title?: string;
  description?: string;
}) {
  const theme = toneStyles[tone];

  return (
    <Card className={cn("overflow-hidden border", theme.borderClass, "bg-white")}>
      <CardContent className="p-0">
        <div className="relative h-56 overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.8),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(239,68,68,0.08),transparent_18%),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:auto,auto,48px_48px,48px_48px]" />
          <div className="absolute left-[18%] top-[24%] h-24 w-2 rounded-full bg-white/70 shadow-sm" />
          <div className="absolute left-[28%] top-[14%] h-44 w-3 rounded-full bg-white/75 shadow-sm" />
          <div className="absolute left-[50%] top-[8%] h-52 w-2 rounded-full bg-white/80 shadow-sm" />
          <div className="absolute left-[8%] top-[42%] h-3 w-72 rounded-full bg-white/75 shadow-sm" />
          <div className="absolute left-[12%] top-[66%] h-2 w-64 rounded-full bg-white/70 shadow-sm" />
          <div className="absolute left-[56%] top-[28%] rounded-2xl bg-white/85 px-3 py-2 text-xs font-medium text-slate-600 shadow-lg">
            Trichardt Road
          </div>
          <div className="absolute left-[22%] top-[62%] rounded-2xl bg-white/85 px-3 py-2 text-xs font-medium text-slate-600 shadow-lg">
            Oos Street
          </div>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-xl",
                theme.badgeClass
              )}
            >
              <MapPinned className="h-6 w-6" />
            </div>
            <div className="mt-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
              Exact pin shared
            </div>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Crosshair className="h-4 w-4 text-sky-600" />
            {title}
          </div>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AccountabilityStrip() {
  const items = [
    "Verified name",
    "Mobile number",
    "Timestamp",
    "GPS location",
    "Device/IP metadata placeholder"
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  note,
  tone = "blue"
}: {
  label: string;
  value: string;
  note: string;
  tone?: AlertTone;
}) {
  return (
    <Card className="border-white/70 bg-white/90">
      <CardContent className="space-y-3 p-6">
        <AlertPill tone={tone} className="w-fit" />
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <p className="text-sm text-slate-600">{note}</p>
      </CardContent>
    </Card>
  );
}

export function DetailDataPoint({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-800">{value}</p>
    </div>
  );
}

export function SuccessNotice({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-emerald-600 p-2 text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-emerald-900">{title}</p>
          <p className="text-sm leading-6 text-emerald-800">{description}</p>
        </div>
      </div>
    </div>
  );
}
