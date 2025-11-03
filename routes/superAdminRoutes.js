// ============================================================
// 🧠 SUPER ADMIN ROUTES
// Centralized route constants for Super Admin panel (Next.js App Router)
// ============================================================

// # Dashboard
export const SUPERADMIN_DASHBOARD = "/super-admin";

// # Clients
export const SUPERADMIN_CLIENTS = "/super-admin/clients";
export const SUPERADMIN_ADD_CLIENT = "/super-admin/clients/add";
export const SUPERADMIN_EDIT_CLIENT = (id) =>
  id ? `/super-admin/clients/${id}/edit` : "";
export const SUPERADMIN_CLIENT_ANALYTICS = (id) =>
  id ? `/super-admin/clients/${id}/analytics` : "";

// # Analytics
export const SUPERADMIN_TRAFFIC_INSIGHTS = "/super-admin/analytics/traffic-insights-dashboard";
export const SUPERADMIN_INTERNAL_ANALYTICS = "/super-admin/analytics/internal-analytics";
export const SUPERADMIN_ENGAGEMENT_BEHAVIOR = "/super-admin/analytics/engagement-behavior";

// # AI Settings
export const SUPERADMIN_AI_SETTINGS = "/super-admin/ai-settings";
export const SUPERADMIN_AI_MEMORY = "/super-admin/ai-settings/memory";
export const SUPERADMIN_AI_PERSONA = "/super-admin/ai-settings/persona";

// # System
export const SUPERADMIN_SYSTEM = "/super-admin/system";
export const SUPERADMIN_SYSTEM_LOGS = "/super-admin/system/logs";
export const SUPERADMIN_SYSTEM_BACKUPS = "/super-admin/system/backups";

// # Users
export const SUPERADMIN_USERS = "/super-admin/users";
export const SUPERADMIN_ADD_USER = "/super-admin/users/add";

// # Settings
export const SUPERADMIN_SETTINGS = "/super-admin/settings";
