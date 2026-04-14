export const env = {
  portalName: process.env.NEXT_PUBLIC_PORTAL_NAME ?? "Secunda24 Emergency",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Secunda24",
  logoPlaceholder: process.env.NEXT_PUBLIC_LOGO_PLACEHOLDER ?? "S24",
  accentHsl: process.env.NEXT_PUBLIC_ACCENT_HSL ?? "210 88% 52%",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  demoClientEmail:
    process.env.DEMO_CLIENT_EMAIL ?? "sarah.chen@amandelstudio.com",
  demoClientPassword: process.env.DEMO_CLIENT_PASSWORD ?? "ClientFlow123!",
  demoAdminEmail:
    process.env.DEMO_ADMIN_EMAIL ?? "olivia.morris@clientflowportal.com",
  demoAdminPassword: process.env.DEMO_ADMIN_PASSWORD ?? "AdminFlow123!"
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
);
