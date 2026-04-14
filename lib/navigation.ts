export type PortalNavIcon =
  | "dashboard"
  | "ticket"
  | "projects"
  | "documents"
  | "billing"
  | "messages"
  | "knowledge-base"
  | "settings"
  | "clients"
  | "branding"
  | "audit";

export type PortalNavItem = {
  label: string;
  href: string;
  icon: PortalNavIcon;
};

export const marketingNav = [
  { label: "Product", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" }
];

export const clientNav: PortalNavItem[] = [
  { label: "Dashboard", href: "/portal/client", icon: "dashboard" },
  { label: "My Requests", href: "/portal/client/requests", icon: "ticket" },
  { label: "Projects", href: "/portal/client/projects", icon: "projects" },
  { label: "Documents", href: "/portal/client/documents", icon: "documents" },
  { label: "Invoices", href: "/portal/client/invoices", icon: "billing" },
  { label: "Messages", href: "/portal/client/messages", icon: "messages" },
  { label: "Knowledge Base", href: "/portal/client/knowledge-base", icon: "knowledge-base" },
  { label: "Profile & Settings", href: "/portal/client/settings", icon: "settings" }
];

export const adminNav: PortalNavItem[] = [
  { label: "Dashboard", href: "/portal/admin", icon: "dashboard" },
  { label: "Client Management", href: "/portal/admin/clients", icon: "clients" },
  { label: "Request Management", href: "/portal/admin/requests", icon: "ticket" },
  { label: "Project Management", href: "/portal/admin/projects", icon: "projects" },
  { label: "Invoice Management", href: "/portal/admin/invoices", icon: "billing" },
  { label: "Document Management", href: "/portal/admin/documents", icon: "documents" },
  { label: "Knowledge Base", href: "/portal/admin/knowledge-base", icon: "knowledge-base" },
  { label: "Branding Settings", href: "/portal/admin/branding", icon: "branding" },
  { label: "Audit Log", href: "/portal/admin/activity", icon: "audit" }
];
