import "dotenv/config";

import crypto from "node:crypto";

import { createClient } from "@supabase/supabase-js";

import {
  activityLogs,
  adminProfiles,
  clientProfiles,
  companies,
  demoCredentials,
  documents,
  invoices,
  knowledgeBaseArticles,
  notifications,
  profiles,
  projectMilestones,
  projects,
  requestMessages,
  requests
} from "../lib/demo-data";
import { env } from "../lib/env";

function stableUuid(seed: string) {
  const hash = crypto.createHash("md5").update(seed).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

function parseDocumentBytes(sizeLabel: string) {
  const amount = Number.parseFloat(sizeLabel);
  return Number.isNaN(amount) ? null : Math.round(amount * 1024 * 1024);
}

async function main() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running the seed.");
  }

  const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false
    }
  });

  const existingUsers = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });

  if (existingUsers.error) {
    throw existingUsers.error;
  }

  const userByEmail = new Map(
    (existingUsers.data.users ?? []).map((user) => [user.email?.toLowerCase() ?? "", user])
  );

  const profileIdMap = new Map<string, string>();
  const adminIdByName = new Map<string, string>();

  for (const profile of profiles) {
    const existing = userByEmail.get(profile.email.toLowerCase());
    let userId = existing?.id;

    if (!userId) {
      const createResult = await supabase.auth.admin.createUser({
        email: profile.email,
        password:
          profile.role === "admin"
            ? demoCredentials.admin.password
            : demoCredentials.client.password,
        email_confirm: true,
        user_metadata: {
          full_name: profile.fullName,
          role: profile.role
        }
      });

      if (createResult.error || !createResult.data.user) {
        throw createResult.error ?? new Error(`Unable to create auth user for ${profile.email}`);
      }

      userId = createResult.data.user.id;
    }

    profileIdMap.set(profile.id, userId);

    if (profile.role === "admin") {
      adminIdByName.set(profile.fullName, userId);
    }
  }

  const companyIdMap = new Map(companies.map((company) => [company.id, stableUuid(`company:${company.id}`)]));
  const requestIdMap = new Map(requests.map((request) => [request.id, stableUuid(`request:${request.id}`)]));
  const projectIdMap = new Map(projects.map((project) => [project.id, stableUuid(`project:${project.id}`)]));
  const documentIdMap = new Map(documents.map((document) => [document.id, stableUuid(`document:${document.id}`)]));
  const invoiceIdMap = new Map(invoices.map((invoice) => [invoice.id, stableUuid(`invoice:${invoice.id}`)]));

  await supabase.from("companies").upsert(
    companies.map((company) => ({
      id: companyIdMap.get(company.id),
      name: company.name,
      industry: company.industry,
      contact_name: company.contactName,
      contact_email: company.contactEmail,
      phone: company.phone,
      plan: company.plan,
      location: company.location,
      client_since: company.clientSince
    })),
    { onConflict: "id" }
  );

  await supabase.from("profiles").upsert(
    profiles.map((profile) => ({
      id: profileIdMap.get(profile.id),
      company_id:
        profile.companyId === "internal" ? null : companyIdMap.get(profile.companyId),
      full_name: profile.fullName,
      email: profile.email,
      role: profile.role,
      title: profile.title,
      phone: profile.phone,
      avatar: profile.avatar
    })),
    { onConflict: "id" }
  );

  await supabase.from("clients").upsert(
    clientProfiles.map((profile, index) => ({
      id: stableUuid(`client:${profile.id}`),
      company_id: companyIdMap.get(profile.companyId),
      profile_id: profileIdMap.get(profile.id),
      portal_access: true,
      is_primary: index === 0 || index % 2 === 0
    })),
    { onConflict: "id" }
  );

  await supabase.from("requests").upsert(
    requests.map((request) => ({
      id: requestIdMap.get(request.id),
      company_id: companyIdMap.get(request.companyId),
      created_by: profileIdMap.get(
        clientProfiles.find((profile) => profile.companyId === request.companyId)?.id ?? clientProfiles[0].id
      ),
      subject: request.subject,
      category: request.category,
      priority: request.priority,
      status: request.status,
      assignee_name: request.assignee,
      description: request.description,
      created_at: request.createdAt,
      updated_at: request.lastUpdated
    })),
    { onConflict: "id" }
  );

  await supabase.from("documents").upsert(
    documents.map((document) => ({
      id: documentIdMap.get(document.id),
      company_id: companyIdMap.get(document.companyId),
      uploaded_by:
        profileIdMap.get(
          profiles.find((profile) => profile.fullName === document.uploadedBy)?.id ?? adminProfiles[0].id
        ) ?? profileIdMap.get(adminProfiles[0].id),
      name: document.name,
      category: document.category,
      visibility: document.visibility,
      storage_path: `clientflow-documents/${document.companyId}/${document.name}`,
      mime_type: "application/octet-stream",
      size_bytes: parseDocumentBytes(document.size),
      summary: document.summary,
      uploaded_at: document.uploadedAt
    })),
    { onConflict: "id" }
  );

  await supabase.from("request_messages").upsert(
    requestMessages.map((message) => ({
      id: stableUuid(`request-message:${message.id}`),
      request_id: requestIdMap.get(message.requestId),
      author_id:
        profileIdMap.get(
          profiles.find((profile) => profile.fullName === message.author)?.id ??
            adminProfiles.find((profile) => profile.fullName === message.author)?.id ??
            clientProfiles.find((profile) => profile.fullName === message.author)?.id ??
            ""
        ) ?? null,
      author_name: message.author,
      author_role: message.role === "staff" ? "admin" : "client",
      body: message.body,
      is_internal: false,
      created_at: message.createdAt
    })),
    { onConflict: "id" }
  );

  await supabase.from("request_attachments").upsert(
    requests.flatMap((request, requestIndex) =>
      request.relatedDocumentIds.map((documentId, attachmentIndex) => ({
        id: stableUuid(`request-attachment:${request.id}:${documentId}`),
        request_id: requestIdMap.get(request.id),
        document_id: documentIdMap.get(documentId),
        created_at: requestMessages[requestIndex + attachmentIndex]?.createdAt ?? request.createdAt
      }))
    ),
    { onConflict: "id" }
  );

  await supabase.from("projects").upsert(
    projects.map((project) => ({
      id: projectIdMap.get(project.id),
      company_id: companyIdMap.get(project.companyId),
      manager_id: adminIdByName.get(project.manager) ?? profileIdMap.get(adminProfiles[0].id),
      name: project.name,
      status: project.status,
      progress: project.progress,
      deadline: project.deadline,
      budget: project.budget,
      description: project.description
    })),
    { onConflict: "id" }
  );

  await supabase.from("project_milestones").upsert(
    projectMilestones.map((milestone) => ({
      id: stableUuid(`milestone:${milestone.id}`),
      project_id: projectIdMap.get(milestone.projectId),
      title: milestone.title,
      due_date: milestone.dueDate,
      status: milestone.status
    })),
    { onConflict: "id" }
  );

  await supabase.from("invoices").upsert(
    invoices.map((invoice) => ({
      id: invoiceIdMap.get(invoice.id),
      company_id: companyIdMap.get(invoice.companyId),
      invoice_number: invoice.invoiceNumber,
      amount: invoice.amount,
      issued_at: invoice.issuedAt,
      due_date: invoice.dueDate,
      status: invoice.status,
      summary: invoice.summary,
      pdf_path: `invoices/${invoice.invoiceNumber}.pdf`
    })),
    { onConflict: "id" }
  );

  await supabase.from("knowledge_base_articles").upsert(
    knowledgeBaseArticles.map((article) => ({
      id: stableUuid(`article:${article.id}`),
      author_id: profileIdMap.get(adminProfiles[0].id),
      title: article.title,
      slug: article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      published: article.published,
      updated_at: article.updatedAt
    })),
    { onConflict: "id" }
  );

  await supabase.from("notifications").upsert(
    notifications.map((notification) => ({
      id: stableUuid(`notification:${notification.id}`),
      profile_id:
        notification.audience === "client"
          ? profileIdMap.get(clientProfiles[0].id)
          : notification.audience === "admin"
            ? profileIdMap.get(adminProfiles[0].id)
            : null,
      audience: notification.audience === "all" ? null : notification.audience,
      title: notification.title,
      description: notification.description,
      unread: notification.unread,
      created_at: notification.createdAt
    })),
    { onConflict: "id" }
  );

  await supabase.from("activity_logs").upsert(
    activityLogs.map((log) => ({
      id: stableUuid(`activity:${log.id}`),
      company_id: log.companyId ? companyIdMap.get(log.companyId) : null,
      actor_id:
        profileIdMap.get(
          profiles.find((profile) => profile.fullName === log.actor)?.id ??
            adminProfiles.find((profile) => profile.fullName === log.actor)?.id ??
            ""
        ) ?? null,
      actor_name: log.actor,
      title: log.title,
      detail: log.detail,
      type: log.type,
      created_at: log.createdAt
    })),
    { onConflict: "id" }
  );

  await supabase.from("branding_settings").upsert(
    [
      {
        id: stableUuid("branding:default"),
        portal_name: env.portalName,
        company_name: env.companyName,
        accent_hsl: env.accentHsl,
        logo_placeholder: env.logoPlaceholder,
        is_active: true
      }
    ],
    { onConflict: "id" }
  );

  console.log("Seed completed successfully.");
  console.log(`Companies: ${companies.length}`);
  console.log(`Profiles: ${profiles.length}`);
  console.log(`Requests: ${requests.length}`);
  console.log(`Projects: ${projects.length}`);
  console.log(`Invoices: ${invoices.length}`);
  console.log(`Documents: ${documents.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
