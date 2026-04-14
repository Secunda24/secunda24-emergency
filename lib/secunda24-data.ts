export type AlertTone = "red" | "blue";

export type IncidentStatus =
  | "New"
  | "Reviewing"
  | "Forwarded"
  | "Responding"
  | "Closed"
  | "False Alarm Flagged";

export interface AuditEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

export interface IncidentRecord {
  id: string;
  tone: AlertTone;
  alertType: string;
  summary: string;
  location: string;
  address: string;
  area: string;
  receivedAt: string;
  status: IncidentStatus;
  reporterName: string;
  reporterMobile: string;
  gps: string;
  deviceMeta: string;
  ipMeta: string;
  partnerAssigned: string;
  auditLog: AuditEntry[];
}

export interface PartnerRecord {
  id: string;
  name: string;
  type: string;
  areaCoverage: string;
  status: "Online" | "Limited" | "Dispatching" | "Standby";
  responseMethod: string;
  eta: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export const howItWorksSteps: StepItem[] = [
  {
    step: "01",
    title: "Verify your number",
    description:
      "Residents confirm identity before using the app so every alert is tied to a real person."
  },
  {
    step: "02",
    title: "Choose Red or Blue Alert",
    description:
      "One tap separates medical emergencies from crime and security incidents."
  },
  {
    step: "03",
    title: "Pin the location",
    description:
      "The map flow captures the exact street, landmark, or drop-pin location in seconds."
  },
  {
    step: "04",
    title: "Submit the alert",
    description:
      "A short 140-character summary keeps reporting fast in high-pressure moments."
  },
  {
    step: "05",
    title: "Trusted partners are notified",
    description:
      "Secunda24 monitoring and local response partners receive structured, accountable incident data."
  }
];

export const whyDifferentPoints = [
  "Not a chat group",
  "Structured alerts instead of free-form panic messages",
  "Verified users with logged identity data",
  "Map-based location capture",
  "Logged reports to reduce abuse",
  "Faster routing to trusted local partners"
];

export const partnerHighlights = [
  "Structured alerts with exact location and short summary",
  "Verified reporter details before a partner receives the incident",
  "Dispatcher dashboard with active status workflow",
  "Audit trail for accountability and abuse prevention",
  "Pilot launch opportunity for local security and medical teams"
];

export const demoFlowCards = [
  {
    title: "Login",
    description: "Mobile number and full name capture a verified resident profile."
  },
  {
    title: "Alert Type",
    description: "Red Alert for medical emergencies and Blue Alert for crime or security events."
  },
  {
    title: "Location Picker",
    description: "A fast map flow lets residents search, pin, or use current location."
  },
  {
    title: "Summary",
    description: "A short, panic-friendly description keeps reporting focused and usable."
  },
  {
    title: "Submitted",
    description: "Confirmation shows logged timestamp, location, summary, and routing status."
  },
  {
    title: "Dispatcher Dashboard",
    description: "Partners review, assign, update, and audit incidents from one console."
  }
];

export const launchNetworkOptions = [
  "I am a resident",
  "I am a security/medical partner"
];

export const partners: PartnerRecord[] = [
  {
    id: "partner-1",
    name: "Secunda Patrol Group",
    type: "Security patrol",
    areaCoverage: "Secunda Central, Trichardt Road corridor, Oos Street",
    status: "Dispatching",
    responseMethod: "Control room + patrol vehicle radio",
    eta: "4-8 min"
  },
  {
    id: "partner-2",
    name: "Local Armed Response",
    type: "Armed response",
    areaCoverage: "Medi Clinic area, shopping centre precinct, fuel station ring",
    status: "Online",
    responseMethod: "Mobile unit dispatch and phone confirmation",
    eta: "6-10 min"
  },
  {
    id: "partner-3",
    name: "Medical Response Partner",
    type: "Emergency medical",
    areaCoverage: "Secunda Central, Evander border, school and clinic zones",
    status: "Online",
    responseMethod: "Medic team dispatch with phone escalation",
    eta: "7-12 min"
  },
  {
    id: "partner-4",
    name: "Community Volunteer Backup",
    type: "Community support",
    areaCoverage: "Outer residential blocks and school pickup routes",
    status: "Standby",
    responseMethod: "Admin broadcast with supervisor approval",
    eta: "10-15 min"
  }
];

export const incidents: IncidentRecord[] = [
  {
    id: "INC-2401",
    tone: "blue",
    alertType: "Crime / Security Emergency",
    summary: "Two men forcing the side gate near the shopping centre loading bay.",
    location: "Secunda Central",
    address: "Trichardt Road shopping centre service gate",
    area: "Retail precinct",
    receivedAt: "2026-04-14T08:12:00+02:00",
    status: "Responding",
    reporterName: "Naledi Khumalo",
    reporterMobile: "+27 82 410 1184",
    gps: "-26.52491, 29.17044",
    deviceMeta: "Android 15 | Samsung A54 | Demo capture",
    ipMeta: "102.131.xxx.xxx | LTE placeholder",
    partnerAssigned: "Secunda Patrol Group",
    auditLog: [
      {
        id: "INC-2401-a1",
        at: "2026-04-14T08:12:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Verified Blue Alert submitted with GPS pin and reporter identity."
      },
      {
        id: "INC-2401-a2",
        at: "2026-04-14T08:13:00+02:00",
        actor: "Secunda24 Dispatch",
        action: "Partner assigned",
        detail: "Assigned to Secunda Patrol Group for immediate gate response."
      },
      {
        id: "INC-2401-a3",
        at: "2026-04-14T08:16:00+02:00",
        actor: "Secunda Patrol Group",
        action: "Status changed",
        detail: "Vehicle 3 marked as responding."
      }
    ]
  },
  {
    id: "INC-2402",
    tone: "red",
    alertType: "Medical Emergency",
    summary: "Driver collapsed in a parked vehicle near Medi Clinic entrance.",
    location: "Medi Clinic area",
    address: "Medi Clinic access road drop-off lane",
    area: "Medical district",
    receivedAt: "2026-04-14T07:58:00+02:00",
    status: "Forwarded",
    reporterName: "Pieter Grobler",
    reporterMobile: "+27 72 885 2010",
    gps: "-26.52174, 29.17761",
    deviceMeta: "iPhone 17 | Demo capture",
    ipMeta: "41.13.xxx.xxx | Fibre placeholder",
    partnerAssigned: "Medical Response Partner",
    auditLog: [
      {
        id: "INC-2402-a1",
        at: "2026-04-14T07:58:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Verified Red Alert captured with exact pin."
      },
      {
        id: "INC-2402-a2",
        at: "2026-04-14T08:00:00+02:00",
        actor: "Secunda24 Dispatch",
        action: "Status changed",
        detail: "Medical Response Partner notified and incident forwarded."
      }
    ]
  },
  {
    id: "INC-2403",
    tone: "blue",
    alertType: "Crime / Security Emergency",
    summary: "Vehicle break-in in progress outside Oos Street primary school pickup zone.",
    location: "Oos Street",
    address: "Oos Street school south parking bays",
    area: "School zone",
    receivedAt: "2026-04-14T07:34:00+02:00",
    status: "Reviewing",
    reporterName: "Ayanda Maseko",
    reporterMobile: "+27 83 774 0901",
    gps: "-26.51867, 29.16392",
    deviceMeta: "Android 14 | Huawei Nova | Demo capture",
    ipMeta: "154.0.xxx.xxx | LTE placeholder",
    partnerAssigned: "Local Armed Response",
    auditLog: [
      {
        id: "INC-2403-a1",
        at: "2026-04-14T07:34:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Blue Alert created with reporter identity and location."
      },
      {
        id: "INC-2403-a2",
        at: "2026-04-14T07:36:00+02:00",
        actor: "Secunda24 Dispatch",
        action: "Status changed",
        detail: "Dispatcher reviewing footage request and local unit availability."
      }
    ]
  },
  {
    id: "INC-2404",
    tone: "red",
    alertType: "Medical Emergency",
    summary: "Elderly resident short of breath at fuel station forecourt bench.",
    location: "Fuel station ring",
    address: "Secunda fuel station on Evander border route",
    area: "Transit zone",
    receivedAt: "2026-04-14T06:49:00+02:00",
    status: "Closed",
    reporterName: "Mpho Dlamini",
    reporterMobile: "+27 78 551 9033",
    gps: "-26.53655, 29.18440",
    deviceMeta: "Android 15 | Xiaomi 14 | Demo capture",
    ipMeta: "105.242.xxx.xxx | LTE placeholder",
    partnerAssigned: "Medical Response Partner",
    auditLog: [
      {
        id: "INC-2404-a1",
        at: "2026-04-14T06:49:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Red Alert captured and verified."
      },
      {
        id: "INC-2404-a2",
        at: "2026-04-14T06:52:00+02:00",
        actor: "Medical Response Partner",
        action: "Status changed",
        detail: "Medic unit dispatched from Medi Clinic area."
      },
      {
        id: "INC-2404-a3",
        at: "2026-04-14T07:18:00+02:00",
        actor: "Secunda24 Dispatch",
        action: "Status changed",
        detail: "Incident closed after handoff to family and clinic staff."
      }
    ]
  },
  {
    id: "INC-2405",
    tone: "blue",
    alertType: "Crime / Security Emergency",
    summary: "Suspicious person checking parked cars near Secunda Central fuel kiosk.",
    location: "Secunda Central",
    address: "Fuel kiosk parking row opposite the taxi pickup point",
    area: "Central transport node",
    receivedAt: "2026-04-14T06:15:00+02:00",
    status: "New",
    reporterName: "Lesego Mokoena",
    reporterMobile: "+27 79 663 4481",
    gps: "-26.52582, 29.16984",
    deviceMeta: "iPhone 16 | Demo capture",
    ipMeta: "197.188.xxx.xxx | Fibre placeholder",
    partnerAssigned: "Unassigned",
    auditLog: [
      {
        id: "INC-2405-a1",
        at: "2026-04-14T06:15:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Blue Alert queued for dispatcher review."
      }
    ]
  },
  {
    id: "INC-2406",
    tone: "blue",
    alertType: "Crime / Security Emergency",
    summary: "Previous report flagged after reporter confirmed children were playing a prank.",
    location: "Evander border",
    address: "Residential access lane near the Evander border turnoff",
    area: "Outer residential edge",
    receivedAt: "2026-04-13T21:22:00+02:00",
    status: "False Alarm Flagged",
    reporterName: "Johan Pretorius",
    reporterMobile: "+27 84 991 7052",
    gps: "-26.54162, 29.19205",
    deviceMeta: "Android 14 | Oppo Reno | Demo capture",
    ipMeta: "41.74.xxx.xxx | LTE placeholder",
    partnerAssigned: "Secunda24 Admin",
    auditLog: [
      {
        id: "INC-2406-a1",
        at: "2026-04-13T21:22:00+02:00",
        actor: "System",
        action: "Alert logged",
        detail: "Blue Alert captured and routed to admin review."
      },
      {
        id: "INC-2406-a2",
        at: "2026-04-13T21:41:00+02:00",
        actor: "Secunda24 Dispatch",
        action: "Status changed",
        detail: "Marked as false alarm after caller confirmation."
      }
    ]
  }
];

export const recentAppAlerts = [
  {
    id: "A-931",
    tone: "blue" as AlertTone,
    alertType: "Crime / Security Emergency",
    location: "Trichardt Road gate house",
    submittedAt: "2026-04-13T20:11:00+02:00",
    status: "Closed" as IncidentStatus,
    summary: "Attempted gate tailgating."
  },
  {
    id: "A-932",
    tone: "red" as AlertTone,
    alertType: "Medical Emergency",
    location: "Medi Clinic area",
    submittedAt: "2026-04-12T18:42:00+02:00",
    status: "Responding" as IncidentStatus,
    summary: "Possible seizure in parking area."
  },
  {
    id: "A-933",
    tone: "blue" as AlertTone,
    alertType: "Crime / Security Emergency",
    location: "Oos Street school gate",
    submittedAt: "2026-04-11T14:19:00+02:00",
    status: "Forwarded" as IncidentStatus,
    summary: "Aggressive person near pickup line."
  },
  {
    id: "A-934",
    tone: "blue" as AlertTone,
    alertType: "Crime / Security Emergency",
    location: "Evander border access lane",
    submittedAt: "2026-04-10T23:57:00+02:00",
    status: "False Alarm Flagged" as IncidentStatus,
    summary: "Noise complaint later confirmed false."
  }
];

export const coverageZones = [
  {
    name: "Central retail ring",
    detail: "Shopping centre, fuel station forecourts, Trichardt Road"
  },
  {
    name: "Medical corridor",
    detail: "Medi Clinic area, nearby access roads, clinic parking"
  },
  {
    name: "Residential edge",
    detail: "Oos Street blocks, school gates, Evander border turnoff"
  }
];
