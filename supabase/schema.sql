create extension if not exists pgcrypto;

create type public.user_role as enum ('client', 'admin');
create type public.request_status as enum ('New', 'In Progress', 'Waiting on Client', 'Completed', 'Overdue');
create type public.invoice_status as enum ('Paid', 'Unpaid', 'Overdue');
create type public.project_status as enum ('Planning', 'In Progress', 'Review', 'Complete');
create type public.document_visibility as enum ('client', 'internal');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text not null,
  contact_name text not null,
  contact_email text not null,
  phone text,
  plan text not null default 'Growth',
  location text,
  client_since timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  company_id uuid references public.companies (id) on delete set null,
  full_name text not null,
  email text not null unique,
  role public.user_role not null default 'client',
  title text,
  phone text,
  avatar text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  portal_access boolean not null default true,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  created_by uuid references public.profiles (id) on delete set null,
  subject text not null,
  category text not null,
  priority text not null,
  status public.request_status not null default 'New',
  assignee_name text,
  description text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.request_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  author_name text not null,
  author_role public.user_role not null,
  body text not null,
  is_internal boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  manager_id uuid references public.profiles (id) on delete set null,
  name text not null,
  status public.project_status not null default 'Planning',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  deadline timestamptz,
  budget numeric(12, 2) not null default 0,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  due_date timestamptz,
  status text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  invoice_number text not null unique,
  amount numeric(12, 2) not null,
  issued_at timestamptz not null,
  due_date timestamptz not null,
  status public.invoice_status not null default 'Unpaid',
  summary text,
  pdf_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  uploaded_by uuid references public.profiles (id) on delete set null,
  name text not null,
  category text not null,
  visibility public.document_visibility not null default 'client',
  storage_path text,
  mime_type text,
  size_bytes bigint,
  summary text,
  uploaded_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.request_attachments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests (id) on delete cascade,
  document_id uuid not null references public.documents (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.knowledge_base_articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles (id) on delete set null,
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text,
  content text not null,
  published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete cascade,
  audience public.user_role,
  title text not null,
  description text,
  unread boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  actor_name text,
  title text not null,
  detail text not null,
  type text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.branding_settings (
  id uuid primary key default gen_random_uuid(),
  portal_name text not null,
  company_name text not null,
  accent_hsl text not null,
  logo_placeholder text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_profiles_company_id on public.profiles (company_id);
create index if not exists idx_clients_company_id on public.clients (company_id);
create index if not exists idx_requests_company_id on public.requests (company_id);
create index if not exists idx_requests_status on public.requests (status);
create index if not exists idx_request_messages_request_id on public.request_messages (request_id);
create index if not exists idx_projects_company_id on public.projects (company_id);
create index if not exists idx_project_milestones_project_id on public.project_milestones (project_id);
create index if not exists idx_invoices_company_id on public.invoices (company_id);
create index if not exists idx_documents_company_id on public.documents (company_id);
create index if not exists idx_notifications_profile_id on public.notifications (profile_id);
create index if not exists idx_activity_logs_company_id on public.activity_logs (company_id);

create trigger set_companies_updated_at
before update on public.companies
for each row execute procedure public.set_updated_at();

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger set_clients_updated_at
before update on public.clients
for each row execute procedure public.set_updated_at();

create trigger set_requests_updated_at
before update on public.requests
for each row execute procedure public.set_updated_at();

create trigger set_request_messages_updated_at
before update on public.request_messages
for each row execute procedure public.set_updated_at();

create trigger set_projects_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

create trigger set_project_milestones_updated_at
before update on public.project_milestones
for each row execute procedure public.set_updated_at();

create trigger set_invoices_updated_at
before update on public.invoices
for each row execute procedure public.set_updated_at();

create trigger set_documents_updated_at
before update on public.documents
for each row execute procedure public.set_updated_at();

create trigger set_knowledge_base_updated_at
before update on public.knowledge_base_articles
for each row execute procedure public.set_updated_at();

create trigger set_notifications_updated_at
before update on public.notifications
for each row execute procedure public.set_updated_at();

create trigger set_branding_settings_updated_at
before update on public.branding_settings
for each row execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.clients
    where profile_id = auth.uid()
      and company_id = target_company_id
      and portal_access = true
  );
$$;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.requests enable row level security;
alter table public.request_messages enable row level security;
alter table public.request_attachments enable row level security;
alter table public.projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.invoices enable row level security;
alter table public.documents enable row level security;
alter table public.knowledge_base_articles enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;
alter table public.branding_settings enable row level security;

create policy "profiles_select_self_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy "profiles_update_self_or_admin"
on public.profiles for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "companies_select_for_members"
on public.companies for select
using (public.is_admin() or public.is_company_member(id));

create policy "clients_select_for_members"
on public.clients for select
using (public.is_admin() or profile_id = auth.uid() or public.is_company_member(company_id));

create policy "requests_select_for_members"
on public.requests for select
using (public.is_admin() or public.is_company_member(company_id));

create policy "requests_insert_for_members"
on public.requests for insert
with check (public.is_admin() or public.is_company_member(company_id));

create policy "requests_update_admin_only"
on public.requests for update
using (public.is_admin())
with check (public.is_admin());

create policy "request_messages_select_for_members"
on public.request_messages for select
using (
  public.is_admin()
  or exists (
    select 1 from public.requests
    where requests.id = request_messages.request_id
      and public.is_company_member(requests.company_id)
      and (request_messages.is_internal = false or public.is_admin())
  )
);

create policy "request_messages_insert_for_members"
on public.request_messages for insert
with check (
  public.is_admin()
  or exists (
    select 1 from public.requests
    where requests.id = request_messages.request_id
      and public.is_company_member(requests.company_id)
      and request_messages.is_internal = false
  )
);

create policy "attachments_select_for_members"
on public.request_attachments for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.requests
    where requests.id = request_attachments.request_id
      and public.is_company_member(requests.company_id)
  )
);

create policy "projects_select_for_members"
on public.projects for select
using (public.is_admin() or public.is_company_member(company_id));

create policy "projects_update_admin_only"
on public.projects for all
using (public.is_admin())
with check (public.is_admin());

create policy "project_milestones_select_for_members"
on public.project_milestones for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.projects
    where projects.id = project_milestones.project_id
      and public.is_company_member(projects.company_id)
  )
);

create policy "project_milestones_update_admin_only"
on public.project_milestones for all
using (public.is_admin())
with check (public.is_admin());

create policy "invoices_select_for_members"
on public.invoices for select
using (public.is_admin() or public.is_company_member(company_id));

create policy "invoices_update_admin_only"
on public.invoices for all
using (public.is_admin())
with check (public.is_admin());

create policy "documents_select_for_members"
on public.documents for select
using (
  public.is_admin()
  or (
    visibility = 'client'
    and public.is_company_member(company_id)
  )
);

create policy "documents_update_admin_only"
on public.documents for all
using (public.is_admin())
with check (public.is_admin());

create policy "knowledge_base_public_read"
on public.knowledge_base_articles for select
using (published = true or public.is_admin());

create policy "knowledge_base_admin_write"
on public.knowledge_base_articles for all
using (public.is_admin())
with check (public.is_admin());

create policy "notifications_select_self_or_admin"
on public.notifications for select
using (
  public.is_admin()
  or profile_id = auth.uid()
  or (
    profile_id is null
    and audience is not null
    and exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = notifications.audience
    )
  )
);

create policy "notifications_update_self_or_admin"
on public.notifications for update
using (public.is_admin() or profile_id = auth.uid())
with check (public.is_admin() or profile_id = auth.uid());

create policy "activity_logs_select_for_members"
on public.activity_logs for select
using (
  public.is_admin()
  or (company_id is not null and public.is_company_member(company_id))
);

create policy "activity_logs_admin_insert"
on public.activity_logs for insert
with check (public.is_admin());

create policy "branding_read_authenticated"
on public.branding_settings for select
using (auth.uid() is not null);

create policy "branding_admin_write"
on public.branding_settings for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('clientflow-documents', 'clientflow-documents', false)
on conflict (id) do nothing;
